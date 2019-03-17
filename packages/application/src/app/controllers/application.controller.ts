import {Application} from "@/app/models/application.model";
import {GitEnvironnement} from "@/app/enums/git-env.enum";
import {Version} from "@/app/models/version.model";
import {find} from "lodash";
import {Step} from "@/app/models/step.model";
import {StepOptionFactoryService} from "@/app/services/step-option-factory.service";

const debug = require('debug')('ultron:ApplicationController')

export class ApplicationController {
    application: Application;

    init(application: Application) {
        this.application = application
    }

    start() {
        this.setStepInformation()
            .catch((err: Error) => {
                debug(err.message)
            })
    }

    setRecipe(name: string) {
        let recipe: Version = find(this.application.versions, {name: name})
        if (typeof recipe === "undefined")
            throw Error(`Application <${this.application.name}> has no recipe with the name <${name}>`)

        // Do something
    }

    setGitVersion(type: GitEnvironnement, version: string) {

    }

    private setStepInformation(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.application.versions.forEach((version) => {
                version.steps.forEach((step: Step) => {
                    try {
                        StepOptionFactoryService.getStepOptions(step, this.application.config)
                    } catch (e) {
                        reject(e)
                    }
                })
            })

            resolve(true)
        })
    }

    private setGitInformation() {
        // Create git instance on the object
    }

    private getEnvironnementInformation() {
        // Load version from server
    }

    private getGitTag() {
        // Get git tag information
    }

    private getGitBranch() {
        // Get git branch
    }
}
