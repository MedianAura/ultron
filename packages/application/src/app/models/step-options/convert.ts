import {JsonObject, JsonProperty} from "json2typescript";
import {CodecParams} from "@/app/models/codec-param.model";

@JsonObject("ConvertOption")
export class ConvertOption extends StepOption {
    @JsonProperty("title", String, true)
    title: string = 'Conversion de fichier(s)';

    @JsonProperty("root", String)
    root: string

    @JsonProperty("codec", [CodecParams])
    codec: CodecParams[]
}
