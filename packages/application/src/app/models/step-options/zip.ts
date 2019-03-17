import {JsonObject, JsonProperty} from "json2typescript";
import {ZipTypeEnum} from "@/app/enums/zip-type.enum";
import {StepOption} from "@/app/models/step-option.model";
import * as path from "path";


@JsonObject("ZipOption")
export class ZipOption extends StepOption {
    @JsonProperty("title", String, true)
    title: string = 'Zip';

    @JsonProperty("type", String)
    type: ZipTypeEnum = undefined;

    @JsonProperty("params", [String])
    params: string[] = [];

    @JsonProperty("mask", [String])
    mask: string[] = [];

    @JsonProperty("fileName", String)
    fileName: string = undefined;

    @JsonProperty("from", String)
    from: string = undefined;

    @JsonProperty("to", String)
    to: string = undefined;

    get cmd() {
        let cmd = 'winrar ';

        let from = path.resolve(this.from) + '\\';
        let to = path.resolve(this.to) + '\\';
        let mask = this.mask;
        let fileName = this.fileName;

        let aParams: string[] = [];
        switch (this.type) {
            case ZipTypeEnum.COMPRESS:
                aParams.push('a -ibck');
                aParams = aParams.concat(this.params);
                aParams.push(to + fileName);
                aParams = aParams.concat(mask.map((value: string) => {
                    value = from + value;
                    return value
                }));
                break;
            case ZipTypeEnum.EXTRACT:
                aParams.push('x -ibck');
                aParams = aParams.concat(this.params);
                aParams.push(from + fileName);
                aParams = aParams.concat(mask);
                aParams.push(to);
                break
        }

        return cmd + aParams.join(' ')
    }
}
