import {existsSync, readFileSync} from 'fs';
import * as path from 'path';
import fg from 'fast-glob';
import {find} from 'lodash';
import {JsonConfiguration} from '@/app/helpers/json-configuration';
import {Application} from '@/app/models/application.model';
import {ApplicationController} from '@/app/controllers/application.controller';
import {GlobalOptionFactoryService} from '@/app/services/global-option-factory.service';

const debug = require('debug')('ultron:CoreController');

class Core {

  public path: PathConfigurationInterface = {
    work: 'c:\\bidon\\ultron',
    app: undefined,
    config: undefined,
    data: undefined,
    extra: undefined,
  };
  public isDev: boolean = true;

  private readonly applicationController: ApplicationController;
  private applications: Application[] = [];

  constructor() {
    this.applicationController = new ApplicationController();
  }

  public setElectron(electron: object) {

  }

  public setApplicationPath(path: string) {
    if (!existsSync(path)) {
      throw Error('Supplied path doesn\'t exist.');
    }

    this.path.app = path;
  }

  public start() {
    if (typeof this.path.app === 'undefined') {
      throw Error('Application path is not set. Use <CoreController.setApplicationPath>');
    }

    this.setConfiguration();
    GlobalOptionFactoryService.setGlobal();

    this.setApplicationConfiguration();
  }

  public loadSelectedApplication(name: string): Promise<void> {
    const application: Application = find(this.applications, {name});
    if (typeof application === 'undefined') {
      throw Error(`Application <${name}> is not found in the list of application.`);
    }

    this.applicationController.init(application);
    return this.applicationController.start();
  }

  public getApplicationController(): ApplicationController {
    return this.applicationController;
  }

  private setConfiguration() {
    const jsonString = readFileSync(
      path.resolve(this.path.app, 'config', 'main_ultron.json'), {encoding: 'utf8'},
    );

    const json: any = JSON.parse(jsonString);
    this.path.config = json.appPath;
    this.path.extra = json.extraPath;
    this.path.data = json.dataPath;
  }

  private setApplicationConfiguration() {
    let entries: string[] = fg.sync(['./data/**/*.json'], {cwd: this.path.config});
    entries = entries.map((entry) => path.resolve(this.path.config, entry));
    this.applications = JsonConfiguration.setJSONConfiguration(entries);
  }
}

interface PathConfigurationInterface {
  work: string;
  app: string;
  data: string;
  extra: string;
  config: string;
}

export const CoreController = new Core();
