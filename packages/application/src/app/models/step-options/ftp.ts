import {JsonObject, JsonProperty} from "json2typescript";
import {StepOption} from "@/app/models/step-option.model";
import {FTP} from "@/app/models/ftp.model";
import {Connection} from "@/app/models/connection.model";

@JsonObject("FtpOption")
export class FtpOption extends StepOption {
    @JsonProperty("title", String, true)
    title: string = 'FTP';

    @JsonProperty("ref", String)
    ref: string = undefined

    @JsonProperty("ftp", FTP)
    ftp: FTP = undefined

    @JsonProperty("connection", Connection, true)
    connection: Connection = undefined
}
