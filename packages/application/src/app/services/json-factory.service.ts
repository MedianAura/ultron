import {JsonConvert, OperationMode, ValueCheckingMode} from "json2typescript";

class JsonFactory {
    private readonly jsonConvert: JsonConvert = undefined;

    constructor() {
        this.jsonConvert = new JsonConvert();
        this.jsonConvert.operationMode = OperationMode.ENABLE; // print some debug data
        this.jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
        this.jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null
    }

    getJsonConverter(): JsonConvert {
        return this.jsonConvert
    }
}

export const JsonFactoryService = new JsonFactory()
