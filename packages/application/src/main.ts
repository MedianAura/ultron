import {CoreController} from "@/app/core";

const core = new CoreController()

try {
    core.setElectron({})
    core.setApplicationPath("D:\\WebServer\\vhost\\Node\\ultron")
    core.start()
} catch (e) {
    console.error((<Error>e).message)
}
