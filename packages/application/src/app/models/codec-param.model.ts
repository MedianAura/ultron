import {JsonObject, JsonProperty} from "json2typescript";
import {CodePageEnum} from "@/app/enums/code-page.enum";

@JsonObject("CodecParams")
export class CodecParams {
    @JsonProperty("codecIn", String)
    codecIn: CodePageEnum;

    @JsonProperty("codecOut", String)
    codecOut: CodePageEnum;

    @JsonProperty("inputPath", String)
    inputPath: string;

    @JsonProperty("inputMask", [String])
    inputMask: string[];

    @JsonProperty("outputPath", String)
    outputPath: string;

    // TODO : Give access to this...
    // get listAction(): object[] {
    //     // return this.steps[this.sequence]['options']['codec'].map((value: CodecParams) => {
    //     //     value['__inputPath'] = this.rootPath + value['inputPath']
    //     //     value['__outputPath'] = this.selectedVersion.workPath + value['outputPath']
    //     //     return value
    //     // })
    // }
}
