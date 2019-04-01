import { Matches } from 'class-validator';
import { JsonObject, JsonProperty } from 'json2typescript';
import moment from 'moment';
import { StepOption } from '../step-option.model';

@JsonObject('EcvOption')
export class EcvOption extends StepOption {
  @JsonProperty('title', String, true)
  public title: string = 'ECV';

  @JsonProperty('config', [String])
  public config: string[] = [];

  @JsonProperty('expirationDate', String, true)
  public expirationDate: string = moment().format('YYYY-MM-DD');

  @Matches(/^\d+.\d+.\d+.\d+$/gm)
  @JsonProperty('archiveVersion', String, true)
  public archiveVersion: string = '';
}
