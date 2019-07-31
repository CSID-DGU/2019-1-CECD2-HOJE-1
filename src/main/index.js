import {app, BrowserWindow, ipcMain} from 'electron';
import createWindow from './createWindow';
import {useState} from "react";
const fs = require('fs');

let win;
let data;
app.on('ready', () => {
    let splash = new BrowserWindow({
        width : 600,
        height : 300,
        frame : false,
        alwaysOnTop : true,
        resizable : false,
        webPreferences : {
            nodeIntegration : true
        }

    });
    splash.loadURL(`file://${__dirname}/../../splash.html`);
    win = createWindow();
    win.window.once('ready-to-show',()=>{
        splash.close();
        win.window.show();
        win.window.webContents.openDevTools();
    });
});

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', (_e, hasVisibleWindow) => {
    if (!hasVisibleWindow) {
        win = createWindow();
    }
});