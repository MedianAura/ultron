import {JsonObject, JsonProperty} from "json2typescript";
import {StepOption} from "@/app/models/step-option.model";

@JsonObject("GitCloneOption")
export class GitCloneOption extends StepOption {
    @JsonProperty("title", String, true)
    title: string = 'Git clone';

    @JsonProperty("repositoryUrl", String)
    repositoryUrl: string = undefined;

    @JsonProperty("repoDev", String)
    repoDev: string = undefined;

    @JsonProperty("cwd", String, true)
    cwd: string = undefined;

    branch: string = undefined;
}
