import { JsonObject, JsonProperty } from 'json2typescript';
import { StepOption } from '../step-option.model';

@JsonObject('CommandOption')
export class CommandOption extends StepOption {
  @JsonProperty('title', String, true)
  public title: string = 'Exécution sur ligne de commandes';

  @JsonProperty('cmd', [String])
  public cmd: string[] = [];
}
