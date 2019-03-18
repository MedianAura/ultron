import {JsonObject, JsonProperty} from "json2typescript";
import {StepOption} from "@/app/models/step-option.model";

@JsonObject("GitCleanOption")
export class GitCleanOption extends StepOption {
    @JsonProperty("title", String, true)
    title: string = 'Git clean';

    @JsonProperty("folder", [String])
    folder: string[] = []

    @JsonProperty("file", [String])
    file: string[] = undefined
}
