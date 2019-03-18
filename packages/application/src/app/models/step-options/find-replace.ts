import {JsonObject, JsonProperty} from 'json2typescript';
import {StepOption} from '@/app/models/step-option.model';

@JsonObject('FindReplaceOption')
export class FindReplaceOption extends StepOption {
  @JsonProperty('title', String, true)
  public title: string = 'Conversion de fichier(s)';

  @JsonProperty('inputPath', String)
  public inputPath: string = undefined;

  @JsonProperty('inputMask', [String])
  public inputMask: string[] = [];

  @JsonProperty('outputPath', String)
  public outputPath: string = undefined;

  @JsonProperty('codec', String)
  public codec: string = undefined;

  @JsonProperty('find', String)
  public find: string = undefined;

  @JsonProperty('replace', String)
  public replace: string = undefined;
}
