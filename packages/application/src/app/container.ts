import getDecorators from "inversify-inject-decorators";
import { Container } from "inversify";
import TYPES from '@/app/types/TYPES';
import {StepOptionFactory} from '@/app/services/step-option-factory.service';
import {CoreController} from '@/app/controllers/core.controller';
import {UltronConfiguration} from '@/app/models/ultron-configuration.model';
import {GlobalOptionFactory} from '@/app/services/global-option-factory.service';
import {JsonConfigurationService} from '@/app/services/json-configuration.service';
import {ApplicationController} from '@/app/controllers/application.controller';

const container = new Container();

container.bind<UltronConfiguration>(TYPES.UltronConfiguration).to(UltronConfiguration).inSingletonScope()
container.bind<GlobalOptionFactory>(TYPES.GlobalOptionFactory).to(GlobalOptionFactory).inSingletonScope()
container.bind<StepOptionFactory>(TYPES.StepOptionFactory).to(StepOptionFactory)
container.bind<JsonConfigurationService>(TYPES.JsonConfigurationService).to(JsonConfigurationService).inSingletonScope()
container.bind<ApplicationController>(TYPES.ApplicationController).to(ApplicationController).inSingletonScope()
container.bind<CoreController>(TYPES.CoreController).to(CoreController).inSingletonScope()

let {lazyInject, lazyMultiInject, lazyInjectTagged, lazyInjectNamed} = getDecorators(container)
export {lazyInject, lazyMultiInject, lazyInjectTagged, lazyInjectNamed}
export default container;
