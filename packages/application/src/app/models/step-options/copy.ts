import {JsonObject, JsonProperty} from "json2typescript";

// TODO : Fix this !
export interface TypeOptionCopy {
    excludeFolder?: {
        source?: string[]
        dest?: string[]
    }
    excludeFile?: {
        source?: string[]
        dest?: string[]
    }
}

@JsonObject("CopyOption")
export class CopyOption extends StepOption {
    @JsonProperty("title", String, true)
    title: string = 'Copy de fichier(S)';

    @JsonProperty("mask", [String])
    mask: string[]

    @JsonProperty("from", String)
    from: string

    @JsonProperty("to", String)
    to: string

    @JsonProperty("type", String)
    type: string
}

