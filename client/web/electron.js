const {
    app,
    BrowserWindow
} = require('electron');

let mainWindow = null;

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webSecurity: false,
    });
    mainWindow.loadURL('file://' + __dirname + '/../web/dist/index.html');
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});