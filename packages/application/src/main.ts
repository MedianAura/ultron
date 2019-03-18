import {CoreController} from '@/app/core';
import {GitEnvironnement} from '@/app/enums/git-env.enum';

console.time()

try {
  CoreController.setElectron({});
  CoreController.setApplicationPath('C:\\wamp\\www\\electron\\ultron-reborn');
  CoreController.start();

  CoreController.loadSelectedApplication('Accueil')
    .then(() => CoreController.getApplicationController().setRecipe('Test'))
    .then(() => CoreController.getApplicationController().setGitVersion(GitEnvironnement.TAG, '1.4.2.4'))
    .then(() => {
      console.timeEnd()
    })
    .catch((e) => {
      console.error(e)
    });
} catch (e) {
  console.error((e as Error).message);
}
