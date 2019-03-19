import {Any, JsonObject, JsonProperty} from 'json2typescript';
import {Environnement} from '@/app/models/environnement.model';
import {Version} from '@/app/models/version.model';
import git, {FetchResult, SimpleGit} from 'simple-git/promise';
import * as path from 'path';
import Bluebird, {Inspection} from 'bluebird';
import {uniq, get} from 'lodash';
import * as fetch from 'node-fetch';
import TYPES from '@/app/types/TYPES';
import {UltronConfiguration} from '@/app/models/ultron-configuration.model';
import container from '@/app/container';

const {SaferEval} = require('safer-eval')
const https = require("https");
const agent = new https.Agent({
  rejectUnauthorized: false
})

const debug = require('debug')('ultron:model:ApplicationModel');

interface GitHeads {
  tags: string[];
  branches: string[];
}

@JsonObject('Application')
export class Application {

  @JsonProperty('type', String)
  public type: string = undefined;

  @JsonProperty('name', String)
  public name: string = undefined;

  @JsonProperty('xRay', String)
  public xRay: string = undefined;

  @JsonProperty('changelog', String)
  public changelog: string = undefined;

  @JsonProperty('environnements', [Environnement])
  public environnements: Environnement[] = [];

  @JsonProperty('versions', [Version])
  public versions: Version[] = [];

  @JsonProperty('config', Any)
  public config: any = undefined;

  public gitWorkInstance: SimpleGit = undefined;

  public gitInstance: SimpleGit = undefined;

  public gitHeads: GitHeads = {
    tags: [],
    branches: [],
  };

  get path(): string {
    let ultron = container.get<UltronConfiguration>(TYPES.UltronConfiguration)
    return path.resolve(ultron.work, 'local', this.name);
  }

  public buildWorkdir(path: string) {
    const fs = require('fs-extra');
    fs.emptyDirSync(path);
    this.gitWorkInstance = git(path);
  }

  public buildLocaldir(): Promise<void> {
    const fs = require('fs-extra');
    fs.ensureDirSync(this.path);
    this.gitInstance = git(this.path);
    return Promise.resolve()
  }

  public setLocalGit(): Promise<FetchResult | string> {
    const fs = require('fs-extra');

    if (fs.existsSync(path.resolve(this.path, '.git'))) {
      return this.gitInstance.fetch(['--all']);
    }

    return this.gitInstance.clone(get(this.config, 'git.repositoryUrl', null), this.path);
  }

  public getGitVersion(): Promise<null> {
    const semverSort = require('semver-sort');

    return new Promise((resolve) => {
      this.gitInstance.listRemote(['--heads', '--tags'])
        .then((aVersionData: string) => {
          const data_list = aVersionData.split('\n');

          const aListHead = [];
          const aListTag = [];

          for (const i in data_list) {
            if (this.fuzzySearch(['release/rel-', 'heads/master', 'heads/release-master', 'env/production'], data_list[i])) {
              continue;
            }

            const tempv = get(data_list[i].split(/\s/), [1], '').replace('^{}', '');
            if (data_list[i].indexOf('refs/tags/') > -1) {
              aListTag.push(tempv.replace('refs/tags/', ''));
            } else if (data_list[i].indexOf('refs/heads/') > -1) {
              aListHead.push(tempv.replace('refs/heads/', ''));
            }
          }

          this.gitHeads.tags = uniq(semverSort.desc(aListTag));
          this.gitHeads.branches = uniq(semverSort.desc(aListHead));
          resolve();
        });
    });
  }

  public getEnvVersion(): Bluebird<any[]> {
    const aListeVersion: any[] = [];
    const fs = require('fs-extra');

    this.environnements.forEach((env) => {
      if (env.path.indexOf('https:') > -1) {
        aListeVersion.push(fetch(env.path, {agent}).then((response: Response) => response.text()));
      } else if (env.path.indexOf('http:') > -1) {
        aListeVersion.push(fetch(env.path).then((response: Response) => response.text()));
      } else {
        aListeVersion.push(fs.readFile(env.path, 'utf8'));
      }
    });

    return Bluebird.all(aListeVersion.map((promise) => {
      return Bluebird.resolve(promise).reflect();
    })).each((inspection: Inspection<string>, key: number) => {
      if (inspection.isFulfilled()) {
        this.environnements[key].version = this.formatVersion(inspection.value());
        debug('Version trouvée ', this.environnements[key].path + ': ' + this.environnements[key].version);
      } else {
        this.environnements[key].version = 'N/D';
        debug('Version non trouvée: ', this.environnements[key].path + ': ' + inspection.reason());
      }
    });
  }

  private fuzzySearch(haystack: string[], needle: string): boolean {
    for (const ndx in haystack) {
      const elem = haystack[ndx];
      if (needle.indexOf(elem) > -1) {
        return true;
      }
    }

    return false;
  }

  private formatVersion(version: string) {
    if (typeof version === 'string' && version.indexOf('oRxvVersion') > -1) {
      const safer = new SaferEval()
      const res: any = safer.runInContext(version.split('=')[1].trim())
      return [res.major, res.minor, res.revision, res.build_number].join('.')
    }
    return 'N/D';
  }
}
