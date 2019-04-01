import { JsonObject, JsonProperty } from 'json2typescript';
import * as path from 'path';
import { ZipTypeEnum } from '../../enums/zip-type.enum';
import { StepOption } from '../step-option.model';

@JsonObject('ZipOption')
export class ZipOption extends StepOption {
  @JsonProperty('title', String, true)
  public title: string = 'Zip';

  @JsonProperty('type', String)
  public type: ZipTypeEnum = undefined;

  @JsonProperty('params', [String])
  public params: string[] = [];

  @JsonProperty('mask', [String])
  public mask: string[] = [];

  @JsonProperty('fileName', String)
  public fileName: string = undefined;

  @JsonProperty('from', String)
  public from: string = undefined;

  @JsonProperty('to', String)
  public to: string = undefined;

  get cmd() {
    const cmd = 'winrar ';

    const from = path.resolve(this.from) + '\\';
    const to = path.resolve(this.to) + '\\';
    const mask = this.mask;
    const fileName = this.fileName;

    let aParams: string[] = [];
    switch (this.type) {
      case ZipTypeEnum.COMPRESS:
        aParams.push('a -ibck');
        aParams = aParams.concat(this.params);
        aParams.push(to + fileName);
        aParams = aParams.concat(
          mask.map((value: string) => {
            value = from + value;
            return value;
          }),
        );
        break;
      case ZipTypeEnum.EXTRACT:
        aParams.push('x -ibck');
        aParams = aParams.concat(this.params);
        aParams.push(from + fileName);
        aParams = aParams.concat(mask);
        aParams.push(to);
        break;
    }

    return cmd + aParams.join(' ');
  }
}
