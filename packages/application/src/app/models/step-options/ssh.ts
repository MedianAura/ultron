import { JsonObject, JsonProperty } from 'json2typescript';
import { Connection } from '../connection.model';
import { StepOption } from '../step-option.model';

@JsonObject('SshOption')
export class SshOption extends StepOption {
  @JsonProperty('title', String, true)
  public title: string = 'SSH';

  @JsonProperty('ref', String)
  public ref: string = undefined;

  @JsonProperty('cmd', [String])
  public commands: string[] = [];

  @JsonProperty('connection', Connection, true)
  public connection: Connection = undefined;
}
