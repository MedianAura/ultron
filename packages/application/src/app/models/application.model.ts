import {Any, JsonObject, JsonProperty} from "json2typescript";
import {Environnement} from "@/app/models/environnement.model";
import {Version} from "@/app/models/version.model";

@JsonObject("Application")
export class Application {
    @JsonProperty("type", String)
    type: string = undefined;

    @JsonProperty("name", String)
    name: string = undefined;

    @JsonProperty("xRay", String)
    xRay: string = undefined;

    @JsonProperty("changelog", String)
    changelog: string = undefined;

    @JsonProperty("environnements", [Environnement])
    environnements: Environnement[] = [];

    @JsonProperty("versions", [Version])
    versions: Version[] = [];

    @JsonProperty("config", Any)
    config: any = undefined;

    constructor() {
    }
}
