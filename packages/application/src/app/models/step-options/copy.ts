import {JsonObject, JsonProperty} from "json2typescript";
import {StepOption} from "@/app/models/step-option.model";

@JsonObject("CopyExclusionOption")
export class CopyExclusionOption extends StepOption {
    @JsonProperty("source", [String], true)
    source?: string[] = []

    @JsonProperty("dest", [String], true)
    dest?: string[] = []
}

@JsonObject("CopyOption")
export class CopyOption extends StepOption {
    @JsonProperty("title", String, true)
    title: string = 'Copy de fichier(S)';

    @JsonProperty("mask", [String])
    mask: string[]

    @JsonProperty("from", String)
    from: string

    @JsonProperty("to", String)
    to: string

    @JsonProperty("type", String)
    type: string

    @JsonProperty("excludeFolder", CopyExclusionOption, true)
    excludeFolder: CopyExclusionOption = undefined

    @JsonProperty("excludeFile", CopyExclusionOption, true)
    excludeFile: CopyExclusionOption = undefined
}

