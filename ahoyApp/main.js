const { app, BrowserWindow } = require('electron');
const path = require('path');

app.name = 'Ahoy Indie Media v28.b';  


function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile(path.join(__dirname, 'www/index.html'));  // Adjust the path here
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});