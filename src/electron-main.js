const { app, BrowserWindow } = require('electron')
const path = require('path')
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {},
  })
  // and load the index.html of the app.
  const startUrl = process.env.ELECTRON_START_URL || `file:///${path.join(__dirname, '/../build/index.html')}`

  mainWindow.loadURL(startUrl)

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
