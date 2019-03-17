import {JsonObject, JsonProperty} from "json2typescript";
import {StepOption} from "@/app/models/step-option.model";

@JsonObject("EmailTemplate")
class EmailTemplate {
    @JsonProperty("ref", String)
    ref: string

    @JsonProperty("title", String)
    title: string
}

@JsonObject("EmailOption")
export class EmailOption extends StepOption {
    @JsonProperty("title", String, true)
    title: string = 'eMail';

    @JsonProperty("to", String)
    to: string = undefined

    @JsonProperty("subject", String)
    subject: string = undefined

    @JsonProperty("text", String, true)
    text: string = undefined

    @JsonProperty("markdown", String, true)
    markdown: string = undefined

    @JsonProperty("template", EmailTemplate)
    template: EmailTemplate = undefined
}
