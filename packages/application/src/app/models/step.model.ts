import {Any, JsonObject, JsonProperty} from "json2typescript";
import {StepOption} from "@/app/models/step-option.model";
import {ValidateNested} from 'class-validator';

@JsonObject("Step")
export class Step {
    @JsonProperty("type", String)
    type: string = undefined;

    @JsonProperty("options", Any)
    jsonOptions: any = undefined;

    @ValidateNested()
    options: StepOption = undefined;
}
