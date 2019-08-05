import {app, BrowserWindow, ipcMain} from 'electron';
import createWindow from './createWindow';
import {useState} from "react";
import delay from 'delay';
const fs = require('fs');

let win;
let data;
app.on('ready', () => {
    let splash = new BrowserWindow({
        width: 600,
        height: 300,
        frame: false,
        alwaysOnTop: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }

    });
    splash.loadURL(`file://${__dirname}/../../splash.html`);
    win = createWindow();
    win.window.once('ready-to-show', () => {
        splash.close();
        win.window.show();
        win.window.webContents.openDevTools();
    });
    ipcMain.on('RESULT1', (event, result) => {
        data = result;
        ipcMain.on('QNA_READY', () => {
            win.window.webContents.send('RESULT2', data);
        })
    });
    ipcMain.on('TEST1',async (event,result)=>{
        console.log('main : ' ,result);
        for(let i = 0 ; i< 100 ; i++) {
            win.window.webContents.send('TEST2', i);
            await  delay(50);
            if(i % 2 === 0){
                win.window.webContents.send('TEST3',i);
            }
        }
    })

});

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', (_e, hasVisibleWindow) => {
    if (!hasVisibleWindow) {
        win = createWindow();
    }
});