import 'es6-shim';
import 'reflect-metadata';
import './inversify.config';

import container from './container';

import TYPES from './types/TYPES';

import { CoreController } from './controllers/core.controller';

export const Core: CoreController = container.get<CoreController>(TYPES.CoreController);
