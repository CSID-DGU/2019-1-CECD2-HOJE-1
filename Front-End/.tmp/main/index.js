'use strict';

var _electron = require('electron');

var _createWindow = require('./createWindow');

var _createWindow2 = _interopRequireDefault(_createWindow);

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');

var win = void 0;
var data = void 0;
_electron.app.on('ready', function () {
    var splash = new _electron.BrowserWindow({
        width: 600,
        height: 300,
        frame: false,
        alwaysOnTop: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }

    });
    splash.loadURL('file://' + __dirname + '/../../splash.html');
    win = (0, _createWindow2.default)();
    win.window.once('ready-to-show', function () {
        splash.close();
        win.window.show();
        win.window.webContents.openDevTools();
    });
    _electron.ipcMain.on('RESULT1', function (event, result) {
        data = result;
        _electron.ipcMain.on('QNA_READY', function () {
            win.window.webContents.send('RESULT2', data);
        });
    });
});

_electron.app.on('window-all-closed', function () {
    _electron.app.quit();
});

_electron.app.on('activate', function (_e, hasVisibleWindow) {
    if (!hasVisibleWindow) {
        win = (0, _createWindow2.default)();
    }
});