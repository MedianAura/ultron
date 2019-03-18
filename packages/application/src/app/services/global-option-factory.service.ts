import {each} from 'lodash';
import {CoreController} from '@/app/core';
import {Tools} from '@/app/helpers/tools';
import * as path from 'path';
import {Version} from '@/app/models/version.model';

const debug = require('debug')('ultron:service:GlobalOptionFactory');

interface OptionReplace {
  [key: string]: any;
}

class GlobalOptionFactory {
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
      '%disque%': Tools.getDrive(CoreController.path.app, CoreController.isDev),
      '%disque_s%': Tools.getArchiveDrive(CoreController.path.app, CoreController.isDev),
      '%workRootPath%': path.resolve(CoreController.path.work, 'work').replace(/\\/g, '\\\\'),
      '%timestamp%': new Date().getTime(),
    };
  }

  public replaceGlobalVariable(json: string): string {
    return this.doReplace(this.global, json);
  }

  public setApplicationGlobal(version: Version) {
    this.versions = {
      '%customName%': version.getCustomName(CoreController.getApplicationController().application.name),
      '%workPath%': version.getWorkPath().replace(/\\/g, '\\\\'),
      '%archiveRootDir%': version.getArchiveRootDir().replace(/\\/g, '\\\\')
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

export const GlobalOptionFactoryService = new GlobalOptionFactory();
