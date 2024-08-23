const { app, BrowserWindow, Menu, Tray, nativeImage, TouchBar, dialog } = require('electron');
const path = require('path');
const { TouchBarButton, TouchBarLabel, TouchBarSpacer } = TouchBar;

app.name = 'Ahoy Indie Media v28.c';  

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,  // Adjusted width for modern MacBook Pro
    height: 900,  // Adjusted height for modern MacBook Pro
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    titleBarStyle: 'hiddenInset',  // Modern macOS look
    vibrancy: 'ultra-dark',  // Enable macOS vibrancy effect
    icon: path.join(__dirname, 'www/img/assets/ahoyFav.png'),  // Set the window icon
  });

  win.loadFile(path.join(__dirname, 'www/index.html'));  // Adjust the path here

  // Add Touch Bar support
  const touchBar = new TouchBar({
    items: [
      new TouchBarButton({
        label: 'Button',
        click: () => { console.log('Button clicked'); }
      }),
      new TouchBarSpacer({ size: 'large' }),
      new TouchBarLabel({ label: 'Label' })
    ]
  });
  win.setTouchBar(touchBar);
}

// Create a native application menu
const isMac = process.platform === 'darwin';
const template = [
  ...(isMac ? [{
    label: app.name,
    submenu: [
      {
        label: 'About Ahoy',
        click: () => {
          dialog.showMessageBox({
            type: 'info',
            title: 'About Ahoy Indie Media',
            message: 'Ahoy Indie Media v28.d',
            detail: 'Ahoy Indie Media - Your homegrown alternative to mainstream media. Discover and support independent artists, musicians, podcasters, and creators from New Haven, Connecticut. Enjoy ad-free, hand-crafted content that celebrates indie culture.'
          });
        }
      },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://ahoy.ooo')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

// Add a custom dock menu
if (isMac) {
  const dockMenu = Menu.buildFromTemplate([
    {
      label: 'New Window',
      click: () => { createWindow(); }
    },
    {
      label: 'New Tab',
      click: () => { console.log('New Tab'); }
    }
  ]);
  app.dock.setMenu(dockMenu);
}

app.whenReady().then(() => {
  createWindow();

  // Make the app icon bounce in the dock
  if (isMac) {
    app.dock.bounce();
    app.dock.setIcon(path.join(__dirname, 'www/img/assets/ahoyFav.png'));  // Set the dock icon
  }
});

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