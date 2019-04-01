import { JsonObject, JsonProperty } from 'json2typescript';
import { StepOption } from '../step-option.model';

@JsonObject('GitCleanOption')
export class GitCleanOption extends StepOption {
  @JsonProperty('title', String, true)
  public title: string = 'Git clean';

  @JsonProperty('folder', [String])
  public folder: string[] = [];

  @JsonProperty('file', [String])
  public file: string[] = undefined;
}
