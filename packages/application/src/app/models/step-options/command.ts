import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("CommandOption")
export class CommandOption extends StepOption {
    @JsonProperty("title", String, true)
    title: string = 'Exécution sur ligne de commandes';

    @JsonProperty("cmd", [String])
    cmd: string[] = []
}
