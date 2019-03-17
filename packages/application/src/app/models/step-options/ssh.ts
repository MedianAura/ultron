import {JsonObject, JsonProperty} from "json2typescript";
import {StepOption} from "@/app/models/step-option.model";
import {Connection} from "@/app/models/connection.model";

@JsonObject("SshOption")
export class SshOption extends StepOption {
    @JsonProperty("title", String, true)
    title: string = 'SSH';

    @JsonProperty("ref", String)
    ref: string = undefined

    @JsonProperty("cmd", [String])
    commands: string[] = []

    @JsonProperty("connection", Connection, true)
    connection: Connection = undefined
}
