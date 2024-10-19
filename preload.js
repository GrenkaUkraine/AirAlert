const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('system', {
    minimize: () => ipcRenderer.send('window-minimize'),
    maximize: () => ipcRenderer.send('window-maximize'),
    close: () => ipcRenderer.send('window-close')
});

contextBridge.exposeInMainWorld('notification', {
    sendNotification: (title, description) => ipcRenderer.send('send-notification', { title, description }),
    sendAlertNotification: (region) => ipcRenderer.send('send-alert-notification', region),
    sendAllClearNotification: (region) => ipcRenderer.send('send-all-clear-notification', region),
    sendConnectionLostNotification: () => ipcRenderer.send('send-connection-lost-notification')
});

contextBridge.exposeInMainWorld('api', {
    checkAlertStatus: (regionId) => ipcRenderer.invoke('checkAlertStatus', regionId),
    getRegions: () => ipcRenderer.invoke('getRegions'),
});

contextBridge.exposeInMainWorld('tray', {
    updateTray: (status) => ipcRenderer.send('update-tray', status)
});

contextBridge.exposeInMainWorld('settings', {
    saveSettings: (settings) => ipcRenderer.send('save-settings', settings),
    loadSettings: () => ipcRenderer.invoke('load-settings')
});