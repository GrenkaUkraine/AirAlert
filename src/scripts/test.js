// new window.Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
//   .onclick = () => { document.getElementById('output').innerText = CLICK_MESSAGE }

buttonOn = document.getElementById('on');
buttonOff = document.getElementById('off');

function sendNotification(title, description) {
    new window.Notification(title, { body: description });
}

buttonOn.onclick = () => sendNotification('alert', 'alert blya');

buttonOff.onclick = () => sendNotification('Alert', 'Alert Off');