## Electron-Boilerplate

ChangeMe.

#### Requirement 

* Node v8.10 plus
* Yarn 1.70 plus ou NPM
* [Node_Gyp](https://github.com/nodejs/node-gyp) 
  * Dans un command line admin
  * ``npm install --global --add-python-to-path --production windows-build-tools``
  * Ajouter, si necessaire: ``%USERPROFILE%\.windows-build-tools\python27\python.exe``
* [Windows 8.1 SDK](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) - [Direct Download](https://go.microsoft.com/fwlink/p/?LinkId=323507)
* ``npm install -g win-node-env``

#### Installation

````
yarn install
ou
npm install
````

#### Developement

Pour démarrer le serveur en mode developement

````
yarn serve
ou
npm run serve
````

Pour démarrer electron en mode developement

````
yarn start:electron:server
ou
npm run start:electron:server
````

Linting

````
yarn lint
ou
npm run lint
````

#### Production

Compilation du Front-End

````
yarn build
npm run build
````

Test du Front End avec Electron

````
yarn start:electron
npm run start:electron
````

Packaging de l'application

````
yarn package
npm run package
````
