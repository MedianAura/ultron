import {JsonObject, JsonProperty} from 'json2typescript';
import {Step} from '@/app/models/step.model';
import {VersionTypeEnum} from '@/app/enums/version-type.enum';
import {get} from 'lodash';
import * as path from 'path';
import TYPES from '@/app/types/TYPES';
import {UltronConfiguration} from '@/app/models/ultron-configuration.model';
import {lazyInject} from '@/app/container';
import {validate, ValidationError} from 'class-validator';

@JsonObject('Version')
export class Version {

  @lazyInject(TYPES.UltronConfiguration)
  private ultron: UltronConfiguration;

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

  public validate(): void {
    let aIsValid: Promise<ValidationError[]>[] = this.steps.map((step) => validate(step));

    Promise.all(aIsValid)
      .then((errors: ValidationError[][]) => {
        let hasErrors = errors.filter((error) => error.length > 0)

        if (hasErrors.length > 0) {
          hasErrors.forEach((error) => {
            error.forEach((e) => {
              e.children.forEach((child) => {
                console.error(child.constraints)
              })
            })
          })
          Promise.reject(false)
        }

        Promise.resolve(true)
      })
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
