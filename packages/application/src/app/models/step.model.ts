import {Any, JsonConvert, JsonObject, JsonProperty, OperationMode, ValueCheckingMode} from "json2typescript";

@JsonObject("Step")
export class Step {
    @JsonProperty("type", String)
    type: string = undefined;

    @JsonProperty("options", Any)
    jsonOptions: any = undefined;
}
