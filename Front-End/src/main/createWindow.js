import {BrowserWindow} from 'electron' ;
class MainWindow {
    constructor() {
        this.window = new BrowserWindow({
            width: 1500,
            height: 700,
            show : false,
            webPreferences : {
                nodeIntegration : true
            }
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