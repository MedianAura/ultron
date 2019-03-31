'use strict';
var _a = require('electron'),
  app = _a.app,
  BrowserWindow = _a.BrowserWindow,
  ipcMain = _a.ipcMain;
var ArgumentParser = require('argparse').ArgumentParser;
var Core = require('@ultron/application').Core;
var path = require('path');
var url = require('url');
var walkBack = require('walk-back');
if (require('electron-squirrel-startup')) {
  app.quit();
}
var args;
var parser = new ArgumentParser({
  addHelp: true,
  version: require('../package').version,
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
var arg = process.argv.slice(1);
if (process.argv.join(' ').indexOf('electron.exe') > -1) {
  arg = process.argv.slice(2);
}
try {
  args = parser.parseKnownArgs(arg);
  args = args[0];
} catch (e) {
  app.quit();
}
var mainWindow;
var api = require('./api.js');
var createWindow = function() {
  mainWindow = new BrowserWindow({
    fullscreenable: false,
    useContentSize: true,
    resizable: false,
    width: 1280,
    height: 924,
    icon: path.join(__dirname, 'assets/ultron_logo.ico'),
  });
  var startURL = url.format({
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
app.on('ready', createWindow);
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});
try {
  Core.setDevelopement(args.dev);
  Core.setElectron(ipcMain);
  Core.setApplicationPath(path.resolve(walkBack(process.cwd(), 'config'), '..'));
  Core.start();
} catch (e) {
  console.error(e.message);
}
//# sourceMappingURL=index.js.map
