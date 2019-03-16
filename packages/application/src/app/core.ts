import {existsSync, readFileSync} from "fs";
import * as path from 'path';
import fg from "fast-glob";
import {JsonConfiguration} from "@/app/helpers/json-configuration";
import {Application} from "@/app/models/application.model";

const debug = require('debug')('ultron:CoreController')

export class CoreController {
    private applications: Application[] = []
    private path: PathConfigurationInterface = {
        app: undefined,
        config: undefined,
        data: undefined,
        extra: undefined
    };

    setElectron(electron: object) {

    }

    setApplicationPath(path: string) {
        if (!existsSync(path))
            throw Error("Supplied path doesn't exist.")

        this.path.app = path
    }

    start() {
        if (typeof this.path.app === "undefined")
            throw Error('Application path is not set. Use <CoreController.setApplicationPath>')

        this.setConfiguration()
        this.setPackageConfiguration()
    }

    private setConfiguration() {
        const jsonString = readFileSync(
            path.resolve(this.path.app, 'config', 'main_ultron.json'), {encoding: 'utf8'}
        );

        const json: any = JSON.parse(jsonString);
        this.path = {app: this.path.app, config: json.appPath, extra: json.extraPath, data: json.dataPath};
    }

    private setPackageConfiguration() {
        let entries: string[] = fg.sync(['./data/**/*.json'], {cwd: this.path.config});
        entries = entries.map((entry) => path.resolve(this.path.config, entry));
        this.applications = JsonConfiguration.setJSONConfiguration(entries)
    }
}

interface PathConfigurationInterface {
    app: string,
    data: string,
    extra: string,
    config: string,
}
