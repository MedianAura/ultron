import { ApplicationController } from './controllers/application.controller';
import { CoreController } from './controllers/core.controller';
import { UltronConfiguration } from './models/ultron-configuration.model';
import { GlobalOptionFactory } from './services/global-option-factory.service';
import { JsonConfigurationService } from './services/json-configuration.service';
import { StepOptionFactory } from './services/step-option-factory.service';

import TYPES from './types/TYPES';

import container from './container';

container
  .bind<UltronConfiguration>(TYPES.UltronConfiguration)
  .to(UltronConfiguration)
  .inSingletonScope();

container
  .bind<GlobalOptionFactory>(TYPES.GlobalOptionFactory)
  .to(GlobalOptionFactory)
  .inSingletonScope();

container.bind<StepOptionFactory>(TYPES.StepOptionFactory).to(StepOptionFactory);

container
  .bind<JsonConfigurationService>(TYPES.JsonConfigurationService)
  .to(JsonConfigurationService)
  .inSingletonScope();

container
  .bind<ApplicationController>(TYPES.ApplicationController)
  .to(ApplicationController)
  .inSingletonScope();

container
  .bind<CoreController>(TYPES.CoreController)
  .to(CoreController)
  .inSingletonScope();
