import { app, BrowserWindow, Menu } from 'electron';
import * as url from 'url';
import * as path from 'path';

let mainWindow: any = null;
const windowWidth = 500;
const windowHeight = 500;

const devMenuTemplate = [
    {
        label: 'Dev',
        submenu: [{
            label: 'Show DevTools',
            click: () => {
                mainWindow.webContents.openDevTools();
            }
        }]
    }
];

app.on('ready', () => {
    mainWindow = new BrowserWindow({ width: windowWidth, height: windowHeight });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));
    // mainWindow.on('closed', () => {
    //     app.exit();
    // });
    const menu = Menu.buildFromTemplate(devMenuTemplate);
    Menu.setApplicationMenu(menu);
    mainWindow.setSkipTaskbar(true);
});
