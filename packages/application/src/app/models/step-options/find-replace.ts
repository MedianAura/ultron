import {JsonObject, JsonProperty} from "json2typescript";
import {StepOption} from "@/app/models/step-option.model";

@JsonObject("FindReplaceOption")
export class FindReplaceOption extends StepOption {
    @JsonProperty("title", String, true)
    title: string = 'Conversion de fichier(s)';

    @JsonProperty("inputPath", String)
    inputPath: string;

    @JsonProperty("inputMask", [String])
    inputMask: string[];

    @JsonProperty("outputPath", String)
    outputPath: string;

    @JsonProperty("codec", String)
    codec: string;

    @JsonProperty("find", String)
    find: string;

    @JsonProperty("replace", String)
    replace: string
}
