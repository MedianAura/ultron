// import {Core} from '@/app/core';
// import {GitEnvironnement} from '@/app/enums/git-env.enum';
//
// console.time()
//
// try {
//   Core.setElectron({});
//   Core.setApplicationPath('C:\\wamp\\www\\electron\\ultron-reborn');
//   Core.start();
//
//   Core.loadSelectedApplication('Accueil')
//     .then(() => Core.getApplicationController().setRecipe('Test'))
//     .then(() => Core.getApplicationController().setGitVersion(GitEnvironnement.TAG, '1.4.2.4'))
//     .then(() => {
//       console.timeEnd()
//     })
//     .catch((e: Error) => {
//       console.error(e)
//     });
// } catch (e) {
//   console.error((e as Error).message);
// }

require('module-alias/register');

import 'es6-shim';
import 'reflect-metadata';
import './app/inversify.config';

import container from './app/container';

import TYPES from './app/types/TYPES';

import { CoreController } from './app/controllers/core.controller';

export const Core: CoreController = container.get<CoreController>(TYPES.CoreController);
