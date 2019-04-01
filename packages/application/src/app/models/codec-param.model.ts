import { JsonObject, JsonProperty } from 'json2typescript';
import { CodePageEnum } from '../enums/code-page.enum';

@JsonObject('CodecParams')
export class CodecParams {
  @JsonProperty('codecIn', String)
  public codecIn: CodePageEnum;

  @JsonProperty('codecOut', String)
  public codecOut: CodePageEnum;

  @JsonProperty('inputPath', String)
  public inputPath: string;

  @JsonProperty('inputMask', [String])
  public inputMask: string[];

  @JsonProperty('outputPath', String)
  public outputPath: string;

  // TODO : Give access to this...
  // get listAction(): object[] {
  //     // return this.steps[this.sequence]['options']['codec'].map((value: CodecParams) => {
  //     //     value['__inputPath'] = this.rootPath + value['inputPath']
  //     //     value['__outputPath'] = this.selectedVersion.workPath + value['outputPath']
  //     //     return value
  //     // })
  // }
}
