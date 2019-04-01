import { JsonObject, JsonProperty } from 'json2typescript';
import { StepOption } from '../step-option.model';

@JsonObject('GitRebaseOption')
export class GitRebaseOption extends StepOption {
  @JsonProperty('title', String, true)
  public title: string = 'Git rebase';

  @JsonProperty('remote', String)
  public remote: string = undefined;

  @JsonProperty('branch', String)
  public branch: string = undefined;
}
