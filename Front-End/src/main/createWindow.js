import {BrowserWindow} from 'electron' ;
class MainWindow {
    constructor() {
        this.window = new BrowserWindow({
            width: 1200,
            height: 650,
            show : false,
            webPreferences : {
                nodeIntegration : true
            },
           // resizable : false
        });
        this.window.loadURL(`file://${__dirname}/../../index.html`);
        this.window.on("closed", () => {
            this.window = null;
        });
    }

}

export default function createWindow() {
    return new MainWindow();
}