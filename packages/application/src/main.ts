import {CoreController} from '@/app/core';

try {
  CoreController.setElectron({});
  CoreController.setApplicationPath('D:\\WebServer\\vhost\\Node\\ultron');
  CoreController.start();

  CoreController.loadSelectedApplication('Accueil');
  CoreController.getApplicationController().setRecipe('Test');
} catch (e) {
  console.error((e as Error).message);
}
