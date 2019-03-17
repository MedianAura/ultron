import {JsonObject, JsonProperty} from "json2typescript";
import {StepOption} from "@/app/models/step-option.model";

@JsonObject("GitRebaseOption")
export class GitRebaseOption extends StepOption {
    @JsonProperty("title", String, true)
    title: string = 'Git rebase';

    @JsonProperty("remote", String)
    remote: string = undefined

    @JsonProperty("branch", String)
    branch: string = undefined
}

