import { JsonObject, JsonProperty } from 'json2typescript';
import { Connection } from '../connection.model';
import { FTP } from '../ftp.model';
import { StepOption } from '../step-option.model';

@JsonObject('FtpOption')
export class FtpOption extends StepOption {
  @JsonProperty('title', String, true)
  public title: string = 'FTP';

  @JsonProperty('ref', String)
  public ref: string = undefined;

  @JsonProperty('ftp', FTP)
  public ftp: FTP = undefined;

  @JsonProperty('connection', Connection, true)
  public connection: Connection = undefined;
}
