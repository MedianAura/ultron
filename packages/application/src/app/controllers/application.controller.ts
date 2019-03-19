import {Application} from '@/app/models/application.model';
import {GitEnvironnement} from '@/app/enums/git-env.enum';
import {Version} from '@/app/models/version.model';
import {find, get} from 'lodash';
import {GlobalOptionFactory} from '@/app/services/global-option-factory.service';
import {StepOptionFactory} from '@/app/services/step-option-factory.service';
import TYPES from '@/app/types/TYPES';
import {inject, injectable} from 'inversify';
import {Step} from '@/app/models/step.model';

const debug = require('debug')('ultron:ApplicationController');

@injectable()
export class ApplicationController {
  public application: Application;
  public recipe: Version;
  public head: string;

  @inject(TYPES.StepOptionFactory)
  private StepOptionFactory: StepOptionFactory;

  @inject(TYPES.GlobalOptionFactory)
  private GlobalOptionFactory: GlobalOptionFactory;

  public init(application: Application) {
    this.application = application;
  }

  public start(): Promise<void> {
    return this.setStepInformation()
      .then(() => this.application.buildLocaldir())
      .then(() => this.application.setLocalGit())
      .then(() => this.application.getGitVersion())
      .then(() => this.application.getEnvVersion())
      .then(() => {
      })
      .catch((err: Error) => {
        debug(err);
      });
  }

  public setRecipe(name: string): Promise<void> {
    const recipe: Version = find(this.application.versions, {name});
    if (typeof recipe === 'undefined') {
      throw Error(`Application <${this.application.name}> has no recipe with the name <${name}>`);
    }

    this.recipe = recipe;
    return Promise.resolve()
  }

  public setGitVersion(type: GitEnvironnement, version: string): Promise<void> {
    const list: string[] = get(this.application.gitHeads, [type], undefined);
    if (typeof list === 'undefined') {
      throw Error(`Git Version must be either <${GitEnvironnement.TAG}> or <${GitEnvironnement.BRANCH}>`);
    }


    const isValid: boolean = list.some((head) => head.includes(version));
    if (!isValid) {
      throw Error(`Git Version for <${type}> doesn't include version <${version}>`);
    }

    this.head = version;
    return Promise.resolve()
  }

  private setStepInformation(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.application.versions.forEach((version) => {
        this.GlobalOptionFactory.setApplicationGlobal(version, this.application);

        version.steps.forEach((step: Step) => {
          try {
            this.StepOptionFactory.getStepOptions(step, this.application.config);
          } catch (e) {
            reject(e);
          }
        });
      });

      resolve(true);
    });
  }
}
