import { ipcMain } from 'electron';
import { loadSettings, saveSettings } from '../database/db.mjs';

function registerSettingsHandlers() {
    ipcMain.on('save-settings', (event, settings) => {
        saveSettings(settings);
    });
    
    ipcMain.handle('load-settings', (event) => {
        return new Promise((resolve) => {
            loadSettings((settings) => {
                resolve(settings);
            });
        });
    });
}

export default registerSettingsHandlers;