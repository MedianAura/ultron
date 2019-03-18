import {Any, JsonObject, JsonProperty} from 'json2typescript';
import {Step} from '@/app/models/step.model';
import {VersionTypeEnum} from '@/app/enums/version-type.enum';
import {get} from 'lodash';
import * as path from 'path';
import {CoreController} from '@/app/core';

@JsonObject('Version')
export class Version {
  @JsonProperty('name', String)
  public name: string = undefined;

  @JsonProperty('title', String)
  public title: VersionTypeEnum = undefined;

  @JsonProperty('type', String)
  public type: string = undefined;

  @JsonProperty('visible', Boolean)
  public visible: boolean = true;

  @JsonProperty('workPath', String, true)
  public workPath: string = undefined;

  @JsonProperty('customName', String, true)
  public customName: string = undefined;

  @JsonProperty('steps', [Step])
  public steps: Step[] = [];

  public getCustomName(name: string): string {
    return get(this, 'customName', name);
  }

  public getWorkPath(): string {
    return path.resolve(CoreController.path.work, 'work', get(this, 'workPath', this.name)) + '\\';
  }

  public getArchiveRootDir(): string {
    return path.dirname(this.getWorkPath().replace(/\\/g, '/')) + '\\';
  }
}
