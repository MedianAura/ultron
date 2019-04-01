import * as fs from 'fs';
import { inject, injectable } from 'inversify';
import { Application } from '../models/application.model';
import TYPES from '../types/TYPES';
import { GlobalOptionFactory } from './global-option-factory.service';
import { JsonFactoryService } from './json-factory.service';

const debug = require('debug')('ultron:Helper:JsonConfiguration');

@injectable()
export class JsonConfigurationService {
  @inject(TYPES.GlobalOptionFactory)
  private GlobalOptionFactory: GlobalOptionFactory;

  public setJSONConfiguration(files: string[]): Application[] {
    const jsons = files.map(file => this.getJSONConfiguration(file));
    return jsons.map(json => this.createApplication(json));
  }

  private createApplication(json: object): Application {
    try {
      return JsonFactoryService.getJsonConverter().deserialize(json, Application) as Application;
    } catch (e) {
      throw Error(e);
    }
  }

  private getJSONConfiguration(file: string): object {
    const text = fs.readFileSync(file, { encoding: 'utf8' });

    try {
      return JSON.parse(this.GlobalOptionFactory.replaceGlobalVariable(text));
    } catch (e) {
      throw Error(e);
    }
  }
}
