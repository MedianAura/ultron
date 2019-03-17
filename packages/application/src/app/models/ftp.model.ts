import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("FTP")
export class FTP {
    @JsonProperty("from", String)
    from: string = undefined

    @JsonProperty("file", String)
    file: string = undefined

    @JsonProperty("to", String)
    to: string = undefined
}
