import {JsonObject, JsonProperty} from 'json2typescript';
import {StepOption} from '@/app/models/step-option.model';

@JsonObject('CopyExclusionOption')
export class CopyExclusionOption extends StepOption {
  @JsonProperty('source', [String], true)
  public source: string[] = [];

  @JsonProperty('dest', [String], true)
  public dest: string[] = [];
}

@JsonObject('CopyOption')
export class CopyOption extends StepOption {
  @JsonProperty('title', String, true)
  public title: string = 'Copy de fichier(S)';

  @JsonProperty('mask', String)
  public mask: string = undefined;

  @JsonProperty('from', String)
  public from: string = undefined;

  @JsonProperty('to', String)
  public to: string = undefined;

  @JsonProperty('excludeFolder', CopyExclusionOption, true)
  public excludeFolder: CopyExclusionOption = undefined;

  @JsonProperty('excludeFile', CopyExclusionOption, true)
  public excludeFile: CopyExclusionOption = undefined;
}

