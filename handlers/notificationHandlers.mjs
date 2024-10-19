import { ipcMain, Notification } from 'electron';
import path from 'path';
import { projectRoot } from '../helpers/dirs.mjs';

function registerNotificationHandlers() {
    ipcMain.on('send-notification-with-builder', (event, { title, description, icon }) => {
        Notifications.sendNotificationWithBuilder(title, description, icon);
    });

    ipcMain.on('send-alert-notification', (event, region) => {
        Notifications.sendAlertNotification(region);
    });

    ipcMain.on('send-all-clear-notification', (event, region) => {
        Notifications.sendAllClearNotification(region);
    });

    ipcMain.on('send-connection-lost-notification', () => {
        Notifications.sendConnectionLostNotification();
    });
}

export class Notifications {
    static sendNotificationWithBuilder(title, description, icon) {
        const notificationOptions = {
            title,
            body: description
        };

        if (icon) {
            if (!path.isAbsolute(icon)) {
                icon = path.join(projectRoot, icon);
            }
            notificationOptions.icon = icon;
        }

        new Notification(notificationOptions).show();
    }

    static sendAlertNotification(region) {
        const description = `Увага! Влада України сповістила про повітряну тривогу в ${region}. Негайно пройти в укриття!`;
        this.sendNotificationWithBuilder(
            '🔴Повітряна тривога!', 
            description, 
            './src/assets/img/alert.ico'
        );
    }

    static sendAllClearNotification(region) {
        const description = `Влада України повідомила про відбій повітряної тривоги в ${region}. Можна повертатись до звичайного життя.`;
        this.sendNotificationWithBuilder(
            '🟢Відбій тривоги!', 
            description, 
            './src/assets/img/noalert.ico'
        );
    }

    static sendConnectionLostNotification() {
        const description = 'Немає доступу до інтернету або API. Перевірте з\'єднання.';
        this.sendNotificationWithBuilder(
            '⚠️Проблеми зі з\'єднанням', 
            description, 
            './src/assets/img/loadingalert.ico'
        );
    }
}

export { registerNotificationHandlers };
