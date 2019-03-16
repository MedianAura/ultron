import {Any, JsonObject, JsonProperty} from "json2typescript";
import {Step} from "@/app/models/step.model";

@JsonObject("Version")
export class Version {
    @JsonProperty("name", String)
    name: string = undefined;

    @JsonProperty("title", String)
    title: string = undefined;

    @JsonProperty("type", String)
    type: string = undefined;

    @JsonProperty("visible", Boolean)
    visible: boolean = true;

    @JsonProperty("workPath", String)
    workPath: string = undefined;

    @JsonProperty("customName", String)
    customName: string = undefined;

    @JsonProperty("steps", [Step])
    steps: Step[] = [];
}
