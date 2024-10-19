import { ipcMain } from 'electron';

function registerSystemButtonsHandlers(win) {
    ipcMain.on('window-minimize', () => {
        win.minimize();
    });

    ipcMain.on('window-maximize', () => {
        win.isMaximized() ? win.unmaximize() : win.maximize();
    });

    ipcMain.on('window-close', () => {
        win.close();
    });
}

export default registerSystemButtonsHandlers;