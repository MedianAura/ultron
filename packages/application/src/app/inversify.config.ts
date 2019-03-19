import {UltronConfiguration} from '@/app/models/ultron-configuration.model';
import TYPES from '@/app/types/TYPES';
import {GlobalOptionFactory} from '@/app/services/global-option-factory.service';
import {StepOptionFactory} from '@/app/services/step-option-factory.service';
import {JsonConfigurationService} from '@/app/services/json-configuration.service';
import {ApplicationController} from '@/app/controllers/application.controller';
import {CoreController} from '@/app/controllers/core.controller';
import container from '@/app/container';

container.bind<UltronConfiguration>(TYPES.UltronConfiguration).to(UltronConfiguration).inSingletonScope()
container.bind<GlobalOptionFactory>(TYPES.GlobalOptionFactory).to(GlobalOptionFactory).inSingletonScope()
container.bind<StepOptionFactory>(TYPES.StepOptionFactory).to(StepOptionFactory)
container.bind<JsonConfigurationService>(TYPES.JsonConfigurationService).to(JsonConfigurationService).inSingletonScope()
container.bind<ApplicationController>(TYPES.ApplicationController).to(ApplicationController).inSingletonScope()
container.bind<CoreController>(TYPES.CoreController).to(CoreController).inSingletonScope()
