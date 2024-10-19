import { app, BrowserWindow } from 'electron/main';
import path from 'path';
import registerHandlers from './handlers/registerHandlers.mjs';
import { projectRoot } from './helpers/dirs.mjs';
import dotenv from 'dotenv';
import AppTray from './modules/appTray.mjs';

dotenv.config();

app.setName('AirAlert');
app.setAppUserModelId(app.name);

let tray; 
let mainWindow;
let isExiting = false;

async function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 500,
    frame: false,
    webPreferences: {
      preload: path.join(projectRoot, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  tray = new AppTray(mainWindow, () => {
    isExiting = true;
    app.exit();
  });
  tray.init();

  mainWindow.loadFile('src/pages/index.html');
  registerHandlers(mainWindow, tray);

  mainWindow.on('close', (event) => {
    if (isExiting) {
      return;
    }
    event.preventDefault();
    mainWindow.hide();
  });
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
  } else {
    mainWindow.show();
  }
});

app.on('will-quit', () => {
  db.close((err) => {
      if (err) {
          console.error('Error closing the database:', err.message);
      }
  });
});