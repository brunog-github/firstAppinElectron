const { app, BrowserWindow, globalShortcut } = require('electron')
const config = require('./config')
const path = require('path') 

let win;

function createWindow() {
    win = new BrowserWindow({
        with: 1280,
        height: 720,
        titleBarStyle: 'hidden',
        alwaysOnTop: true,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('./files/index.html')

    
    /*  URL dinâmica 
    
        win.loadURL(config.url) 
        
    */

    /* Posso dar load em uma URL ao invés de um arquivo .hmtl 
        
        win.loadURL('https://gestordepedidos.ifood.com.br/#/login') 
    */
}

function toggleDevTools() {
    win.webContents.toggleDevTools()
}

function createShortcurts() {
    globalShortcut.register('CmdOrCtrl+J', toggleDevTools)
}

app.whenReady()

.then(() => {
    createWindow()
    createShortcurts()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
  
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit()
})