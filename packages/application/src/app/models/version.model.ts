import { validate, ValidationError } from 'class-validator';
import { JsonObject, JsonProperty } from 'json2typescript';
import { get } from 'lodash';
import * as path from 'path';
import { lazyInject } from '../container';
import { VersionTypeEnum } from '../enums/version-type.enum';
import TYPES from '../types/TYPES';
import { Step } from './step.model';
import { UltronConfiguration } from './ultron-configuration.model';

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

  @lazyInject(TYPES.UltronConfiguration)
  private ultron: UltronConfiguration;

  public validate(): void {
    const aIsValid: Array<Promise<ValidationError[]>> = this.steps.map(step => validate(step));

    Promise.all(aIsValid).then((errors: ValidationError[][]) => {
      const hasErrors = errors.filter(error => error.length > 0);

      if (hasErrors.length > 0) {
        hasErrors.forEach(error => {
          error.forEach(e => {
            e.children.forEach(child => {
              console.error(child.constraints);
            });
          });
        });
        Promise.reject(false);
      }

      Promise.resolve(true);
    });
  }

  public getCustomName(name: string): string {
    return get(this, 'customName', name);
  }

  public getWorkPath(): string {
    return path.resolve(this.ultron.work, 'work', get(this, 'workPath', this.name)) + '\\';
  }

  public getArchiveRootDir(): string {
    return path.dirname(this.getWorkPath().replace(/\\/g, '/')) + '\\';
  }
}
