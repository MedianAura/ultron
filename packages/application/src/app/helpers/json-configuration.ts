import {JsonConvert, OperationMode, ValueCheckingMode} from "json2typescript";
import {Application} from "@/app/models/application.model";
import * as fs from "fs";

const debug = require('debug')('ultron:Helper:JsonConfiguration');

export class JsonConfiguration {
    static setJSONConfiguration(files: string[]): Application[] {
        const jsons = files.map((file) => this.getJSONConfiguration(file));
        return jsons.map((json) => this.createApplication(json))
    }

    private static createApplication(json: object): Application {
        let jsonConvert: JsonConvert = new JsonConvert();
        jsonConvert.operationMode = OperationMode.ENABLE; // print some debug data
        jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
        jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null

        try {
            return jsonConvert.deserialize(json, Application) as Application;
        } catch (e) {
            throw Error(e)
        }
    }

    private static getJSONConfiguration(file: string): object {
        const text = fs.readFileSync(file, {encoding: 'utf8'});
        try {
            return JSON.parse(text)
        } catch (e) {
            throw Error(e)
        }
    }
}
