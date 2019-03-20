import {existsSync, readFileSync} from 'fs';
import * as path from 'path';
import fg from 'fast-glob';
import {find} from 'lodash';
import {Application} from '@/app/models/application.model';
import {ApplicationController} from '@/app/controllers/application.controller';
import {GlobalOptionFactory} from '@/app/services/global-option-factory.service';
import {inject, injectable} from 'inversify';
import TYPES from '@/app/types/TYPES';
import {UltronConfiguration} from '@/app/models/ultron-configuration.model';
import {JsonConfigurationService} from '@/app/services/json-configuration.service';

const debug = require('debug')('ultron:CoreController');

@injectable()
export class CoreController {

  @inject(TYPES.UltronConfiguration)
  private path: UltronConfiguration;

  @inject(TYPES.GlobalOptionFactory)
  private GlobalOptionFactory: GlobalOptionFactory;

  @inject(TYPES.JsonConfigurationService)
  private JsonConfigurationService: JsonConfigurationService;

  @inject(TYPES.ApplicationController)
  private applicationController: ApplicationController;

  private applications: Application[] = [];

  public setElectron(ipcMain: any) {
    ipcMain.on('talkie-walkie', (event: any, arg: any) => {
      event.sender.send('talkie-walkie', {'request': 'get-applications', 'response': this.applications})
    })
  }

  public setDevelopement(isDev: boolean) {
    this.path.isDev = isDev
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
    this.GlobalOptionFactory.setGlobal();

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
    this.applications = this.JsonConfigurationService.setJSONConfiguration(entries);
  }
}
