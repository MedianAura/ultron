import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';
import {Application} from '@/app/models/application.model';
import * as fs from 'fs';
import {JsonFactoryService} from '@/app/services/json-factory.service';
import {GlobalOptionFactoryService} from '@/app/services/global-option-factory.service';

const debug = require('debug')('ultron:Helper:JsonConfiguration');

export class JsonConfiguration {
  public static setJSONConfiguration(files: string[]): Application[] {
    const jsons = files.map((file) => this.getJSONConfiguration(file));
    return jsons.map((json) => this.createApplication(json));
  }

  private static createApplication(json: object): Application {
    try {
      return JsonFactoryService.getJsonConverter().deserialize(json, Application) as Application;
    } catch (e) {
      throw Error(e);
    }
  }

  private static getJSONConfiguration(file: string): object {
    const text = fs.readFileSync(file, {encoding: 'utf8'});

    try {
      return JSON.parse(GlobalOptionFactoryService.replaceGlobalVariable(text));
    } catch (e) {
      throw Error(e);
    }
  }
}
