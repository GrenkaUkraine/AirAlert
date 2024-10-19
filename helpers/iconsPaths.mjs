const loadingIcon = './src/assets/ico/loadingalert.ico';
const alertIcon = './src/assets/ico/alert.ico';
const noAlertIcon = './src/assets/ico/noalert.ico';

function intToIcon(n) {
    switch (n) {
        case 1:
            return noAlertIcon;
        case 2:
            return alertIcon;
        default:
            return loadingIcon;
    }
}

export { loadingIcon, alertIcon, noAlertIcon };