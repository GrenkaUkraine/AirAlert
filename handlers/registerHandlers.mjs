import registerAlertsApiHandlers from './alertsApiHandlers.mjs';
import { registerNotificationHandlers } from './notificationHandlers.mjs'
import registerSystemButtonsHandlers from './systemButtons.mjs'
import registerTrayUpdateHandlers from './trayUpdateHandlers.mjs';


function registerHandlers(win, tray) {
    registerNotificationHandlers();
    registerSystemButtonsHandlers(win);
    registerAlertsApiHandlers();
    registerTrayUpdateHandlers(tray);
}

export default registerHandlers;