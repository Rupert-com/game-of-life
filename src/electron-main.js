const { app, BrowserWindow } = require('electron')
const path = require('path')

const url = require('url')
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // and load the index.html of the app.
  const startUrl =
    process.env.ELECTRON_START_URL ||
    new URL({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true,
    }).toString()

  console.log('startUrl', startUrl)
  mainWindow.loadURL(startUrl)

  mainWindow.webContents.openDevTools()

  mainWindow.on('close', () => {
    mainWindow = undefined
  })
}
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
