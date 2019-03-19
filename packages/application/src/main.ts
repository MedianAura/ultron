import {Core} from '@/app/core';
import {GitEnvironnement} from '@/app/enums/git-env.enum';

console.time()

try {
  Core.setElectron({});
  Core.setApplicationPath('C:\\wamp\\www\\electron\\ultron-reborn');
  Core.start();

  Core.loadSelectedApplication('Accueil')
    .then(() => Core.getApplicationController().setRecipe('Test'))
    .then(() => Core.getApplicationController().setGitVersion(GitEnvironnement.TAG, '1.4.2.4'))
    .then(() => {
      console.timeEnd()
    })
    .catch((e) => {
      console.error(e)
    });
} catch (e) {
  console.error((e as Error).message);
}
