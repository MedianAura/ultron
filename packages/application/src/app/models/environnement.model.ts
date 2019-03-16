import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("Environnement")
export class Environnement {
    @JsonProperty("environment", String)
    environment: string = undefined;

    @JsonProperty("name", String)
    name: string = undefined;

    @JsonProperty("ref", String)
    ref: string = undefined;

    @JsonProperty("path", String)
    path: string = undefined;

    @JsonProperty("version", String)
    version: string = undefined;
}
