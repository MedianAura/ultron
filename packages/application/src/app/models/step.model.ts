import {Any, JsonObject, JsonProperty} from "json2typescript";

@JsonObject("Step")
export class Step {
    @JsonProperty("type", String)
    type: string = undefined;

    @JsonProperty("options", Any)
    jsonOptions: any = undefined;

    setConfigurationOptions(config: object) {

    }
}
