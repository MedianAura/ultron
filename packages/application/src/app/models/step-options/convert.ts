import { JsonObject, JsonProperty } from 'json2typescript';
import { CodecParams } from '../codec-param.model';
import { StepOption } from '../step-option.model';

@JsonObject('ConvertOption')
export class ConvertOption extends StepOption {
  @JsonProperty('title', String, true)
  public title: string = 'Conversion de fichier(s)';

  @JsonProperty('root', String)
  public root: string = undefined;

  @JsonProperty('codec', [CodecParams])
  public codec: CodecParams[] = [];
}
