import { JsonObject, JsonProperty } from 'json2typescript';
import { StepOption } from '../step-option.model';

@JsonObject('GitCloneOption')
export class GitCloneOption extends StepOption {
  @JsonProperty('title', String, true)
  public title: string = 'Git clone';

  @JsonProperty('repositoryUrl', String)
  public repositoryUrl: string = undefined;

  @JsonProperty('repoDev', String)
  public repoDev: string = undefined;

  @JsonProperty('cwd', String, true)
  public cwd: string = undefined;

  public branch: string = undefined;
}
