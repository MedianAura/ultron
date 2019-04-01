import { JsonObject, JsonProperty } from 'json2typescript';
import { StepOption } from '../step-option.model';

@JsonObject('EmailTemplate')
class EmailTemplate {
  @JsonProperty('ref', String)
  public ref: string;

  @JsonProperty('title', String)
  public title: string;
}

@JsonObject('EmailOption')
export class EmailOption extends StepOption {
  @JsonProperty('title', String, true)
  public title: string = 'eMail';

  @JsonProperty('to', String)
  public to: string = undefined;

  @JsonProperty('subject', String)
  public subject: string = undefined;

  @JsonProperty('text', String, true)
  public text: string = undefined;

  @JsonProperty('markdown', String, true)
  public markdown: string = undefined;

  @JsonProperty('template', EmailTemplate)
  public template: EmailTemplate = undefined;
}
