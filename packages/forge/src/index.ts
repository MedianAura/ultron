const { app, BrowserWindow, ipcMain } = require('electron');
const ArgumentParser = require('argparse').ArgumentParser;
const { Core } = require('@ultron/application');
const path = require('path');
const url = require('url');
const walkBack = require('walk-back');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

let args;
let parser = new ArgumentParser({
  version: require('../package').version,
  addHelp: true,
  description: require('../package').description,
  prog: require('../package.json').name,
});

parser.addArgument(['-d', '--debug'], {
  help: 'Active le mode debug.',
  defaultValue: false,
  action: 'storeTrue',
});

parser.addArgument(['-s', '--server'], {
  help: 'Lance le programme avec un serveur de debug.',
  defaultValue: false,
  action: 'storeTrue',
});

parser.addArgument(['--dev'], {
  help: 'Lance le programme en mode développement.',
  defaultValue: false,
  action: 'storeTrue',
});

let arg = process.argv.slice(1);
if (process.argv.join(' ').indexOf('electron.exe') > -1) {
  arg = process.argv.slice(2);
}

try {
  args = parser.parseKnownArgs(arg);
  args = args[0];
} catch (e) {
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
const api = require('./api.js');

const createWindow = () => {
  mainWindow = new BrowserWindow({
    fullscreenable: false,
    useContentSize: true,
    resizable: false,
    width: 1280,
    height: 924,
    icon: path.join(__dirname, 'assets/ultron_logo.ico'),
  });

  let startURL = url.format({
    pathname: path.join(__dirname, '../dist/index.html'),
    protocol: 'file:',
    slashes: true,
  });

  if (args.debug && args.server) {
    startURL = url.format({
      pathname: 'localhost:8080',
      protocol: 'http:',
      slashes: true,
    });
  }

  mainWindow.loadURL(startURL);

  if (args.debug) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  global.cmdArgs = args;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here

try {
  Core.setDevelopement(args.dev);
  Core.setElectron(ipcMain);
  Core.setApplicationPath(path.resolve(walkBack(process.cwd(), 'config'), '..'));
  Core.start();
} catch (e) {
  console.error(e.message);
}
