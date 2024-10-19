import { Tray, Menu, shell, app } from 'electron';
import { loadingIcon, alertIcon, noAlertIcon } from '../helpers/iconsPaths.mjs';

class AppTray {
    constructor(window, onExit) {
        this.tray = null;
        this.window = window;
        this.onExit = onExit
    }

    init() {
        this.tray = new Tray(loadingIcon);
        this.tray.setToolTip('AirAlert');
        this.tray.on('click', () => {
            // Логика разворачивания окна при клике на иконку или название
            if (this.window.isVisible()) {
                this.window.hide();
            } else {
                this.window.show();
            }
        });

        this.initContextMenu();
    }

    initContextMenu() {
        const contextMenu = Menu.buildFromTemplate([
            { label: 'AirAlert', enabled: false },
            { type: 'separator' },
            {
                label: 'Відкрити детальну мапу',
                type: 'normal',
                click: () => {
                    shell.openExternal('https://alerts.in.ua/');
                }
            },
            {
                label: 'Тест сповіщення',
                type: 'normal',
                click: () => {
                    console.log('Тест сповіщення');
                }
            },
            { type: 'separator' },
            {
                label: 'Закрити',
                type: 'normal',
                click: this.onExit
            }
        ]);
        this.tray.setContextMenu(contextMenu);
    }

    updateTray(status) {
        switch (status) {
            case 0:
                this.tray.setImage(loadingIcon);
                this.tray.setToolTip('AirAlert (Завантаження...)');
                break;
            case 1:
                this.tray.setImage(noAlertIcon);
                this.tray.setToolTip('AirAlert (Тривоги немає)');
                break;
            case 2:
                this.tray.setImage(alertIcon);
                this.tray.setToolTip('AirAlert (Повітряна тривога!)');
                break;
        }
    }
}

export default AppTray;
