import { ipcMain } from 'electron';
import { alertIcon, loadingIcon, noAlertIcon } from '../helpers/iconsPaths.mjs';

function registerTrayUpdateHandlers(tray) {
    ipcMain.on('update-tray', (event, status) => {
        tray.updateTray(status);
    });
}

export default registerTrayUpdateHandlers;