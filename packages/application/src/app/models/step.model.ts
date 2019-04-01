import { ValidateNested } from 'class-validator';
import { Any, JsonObject, JsonProperty } from 'json2typescript';
import { StepOption } from './step-option.model';

@JsonObject('Step')
export class Step {
  @JsonProperty('type', String)
  public type: string = undefined;

  @JsonProperty('options', Any, true)
  public jsonOptions: any = undefined;

  @ValidateNested()
  public options: StepOption = undefined;
}
