import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("Connection")
export class Connection {
    @JsonProperty("from", String)
    host: string = undefined

    @JsonProperty("from", String)
    port: string = undefined

    @JsonProperty("from", String)
    userName: string = undefined

    @JsonProperty("from", String)
    password: string = undefined
}
