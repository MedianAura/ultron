import {Application} from '@/app/models/application.model';
import * as fs from 'fs';
import {JsonFactoryService} from '@/app/services/json-factory.service';
import {GlobalOptionFactory} from '@/app/services/global-option-factory.service';
import {inject, injectable} from 'inversify';
import TYPES from '@/app/types/TYPES';

const debug = require('debug')('ultron:Helper:JsonConfiguration');

@injectable()
export class JsonConfigurationService {

  @inject(TYPES.GlobalOptionFactory)
  private GlobalOptionFactory: GlobalOptionFactory;

  public setJSONConfiguration(files: string[]): Application[] {
    const jsons = files.map((file) => this.getJSONConfiguration(file));
    return jsons.map((json) => this.createApplication(json));
  }

  private createApplication(json: object): Application {
    try {
      return JsonFactoryService.getJsonConverter().deserialize(json, Application) as Application;
    } catch (e) {
      throw Error(e);
    }
  }

  private getJSONConfiguration(file: string): object {
    const text = fs.readFileSync(file, {encoding: 'utf8'});

    try {
      return JSON.parse(this.GlobalOptionFactory.replaceGlobalVariable(text));
    } catch (e) {
      throw Error(e);
    }
  }
}
