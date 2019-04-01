import { inject, injectable } from 'inversify';
import { each } from 'lodash';
import * as path from 'path';
import { Tools } from '../helpers/tools';
import { Application } from '../models/application.model';
import { UltronConfiguration } from '../models/ultron-configuration.model';
import { Version } from '../models/version.model';
import TYPES from '../types/TYPES';

const debug = require('debug')('ultron:service:GlobalOptionFactory');

interface OptionReplace {
  [key: string]: any;
}

@injectable()
export class GlobalOptionFactory {
  @inject(TYPES.UltronConfiguration)
  private config: UltronConfiguration;

  private global: OptionReplace = {
    '%disque%': undefined,
    '%disque_s%': undefined,
    '%workRootPath%': undefined,
    '%timestamp%': new Date().getTime(),
  };

  private versions: OptionReplace = {
    '%customName%': undefined,
    '%workPath%': undefined,
    '%archiveRootDir%': undefined,
  };

  public setGlobal() {
    this.global = {
      '%disque%': Tools.getDrive(this.config.app, this.config.isDev),
      '%disque_s%': Tools.getArchiveDrive(this.config.app, this.config.isDev),
      '%workRootPath%': path.resolve(this.config.work, 'work').replace(/\\/g, '\\\\'),
      '%timestamp%': new Date().getTime(),
    };
  }

  public replaceGlobalVariable(json: string): string {
    return this.doReplace(this.global, json);
  }

  public setApplicationGlobal(version: Version, application: Application) {
    this.versions = {
      '%customName%': version.getCustomName(application.name),
      '%workPath%': version.getWorkPath().replace(/\\/g, '\\\\'),
      '%archiveRootDir%': version.getArchiveRootDir().replace(/\\/g, '\\\\'),
    };
  }

  public replaceApplicationGlobalVariable(json: string): string {
    return this.doReplace(this.versions, json);
  }

  private doReplace(needles: OptionReplace, json: string): string {
    each(needles, (value: any, key: string) => {
      if (typeof value === 'undefined') {
        return;
      }

      json = json.replace(new RegExp(key, 'g'), value);
    });

    return json;
  }
}
