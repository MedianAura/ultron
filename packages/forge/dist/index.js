"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var application_1 = require("@ultron/application");
var argparse_1 = require("argparse");
var electron_1 = require("electron");
var path_1 = tslib_1.__importDefault(require("path"));
var url_1 = tslib_1.__importDefault(require("url"));
var walk_back_1 = tslib_1.__importDefault(require("walk-back"));
require("./api.js");
if (require('electron-squirrel-startup')) {
    electron_1.app.quit();
}
var args;
var parser = new argparse_1.ArgumentParser({
    addHelp: true,
    description: require('../package').description,
    prog: require('../package.json').name,
    version: require('../package').version,
});
parser.addArgument(['-d', '--debug'], {
    action: 'storeTrue',
    defaultValue: false,
    help: 'Active le mode debug.',
});
parser.addArgument(['-s', '--server'], {
    action: 'storeTrue',
    defaultValue: false,
    help: 'Lance le programme avec un serveur de debug.',
});
parser.addArgument(['--dev'], {
    action: 'storeTrue',
    defaultValue: false,
    help: 'Lance le programme en mode développement.',
});
var arg = process.argv.slice(1);
if (process.argv.join(' ').indexOf('electron.exe') > -1) {
    arg = process.argv.slice(2);
}
try {
    args = parser.parseKnownArgs(arg);
    args = args[0];
}
catch (e) {
    electron_1.app.quit();
}
var mainWindow;
var createWindow = function () {
    mainWindow = new electron_1.BrowserWindow({
        fullscreenable: false,
        useContentSize: true,
        resizable: false,
        width: 1280,
        height: 924,
        icon: path_1.default.join(__dirname, 'assets/ultron_logo.ico'),
    });
    var startURL = url_1.default.format({
        pathname: path_1.default.join(__dirname, '../dist/index.html'),
        protocol: 'file:',
        slashes: true,
    });
    if (args.debug && args.server) {
        startURL = url_1.default.format({
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
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
try {
    application_1.Core.setDevelopement(args.dev);
    application_1.Core.setApplicationPath(path_1.default.resolve(walk_back_1.default(process.cwd(), 'config'), '..'));
    application_1.Core.start();
}
catch (e) {
    console.error(e.message);
}
//# sourceMappingURL=index.js.map