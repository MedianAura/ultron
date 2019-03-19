import moment from 'moment';
import {JsonObject, JsonProperty} from 'json2typescript';
import {StepOption} from '@/app/models/step-option.model';
import {Matches} from 'class-validator';

@JsonObject('EcvOption')
export class EcvOption extends StepOption {
  @JsonProperty('title', String, true)
  title: string = 'ECV';

  @JsonProperty('config', [String])
  config: string[] = [];

  @JsonProperty('expirationDate', String, true)
  expirationDate: string = moment().format('YYYY-MM-DD');

  @Matches(/^\d+.\d+.\d+.\d+$/gm)
  @JsonProperty('archiveVersion', String, true)
  archiveVersion: string = '';
}
