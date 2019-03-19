import 'reflect-metadata';
import 'es6-shim';
import container from "./container"
import "./inversify.config"
import TYPES from '@/app/types/TYPES';
import {CoreController} from '@/app/controllers/core.controller';

export const Core = container.get<CoreController>(TYPES.CoreController);
