const imageUrl = 'https://alerts.com.ua/map.png';
const loadingAlertsMapImageSrc = '../assets/img/map.png';

let lastStatus = 0;

async function updateImage(imgElement) {
    try {
        const response = await fetch(imageUrl);
        if (response.ok) {
            imgElement.src = imageUrl + '?' + new Date().getTime();
        } else {
            imgElement.src = loadingAlertsMapImageSrc;
        }
    } catch (error) {
        console.log(error);
        
        imgElement.src = loadingAlertsMapImageSrc;
    }
}

// Функция для обновления трея
function updateTray(status) {
    switch (status) {
        case 0:
            window.tray.updateTray(0); // Обновляем трей на загрузку
            break;
        case 1:
            window.tray.updateTray(1); // Обновляем трей на отсутствие тревоги
            break;
        case 2:
            window.tray.updateTray(2); // Обновляем трей на тревогу
            break;
    }
}

async function updateStatus(regionSelect, statusText, cachedNotifications=true) {
    if (!(regionSelect && statusText)) {
        return;
    }

    const regionId = regionSelect.value;
    const selectedOption = regionSelect.selectedOptions[0];
    const selectedText = selectedOption.textContent;

    try {
        const alertStatus = await window.api.checkAlertStatus(regionId);
        
        if (alertStatus) {
            statusText.textContent = 'Повітряна тривога!';
            updateTray(2); // Вызов функции для обновления трея
            await sendNotification(2, {region: selectedText}, cachedNotifications);
        } else {
            statusText.textContent = 'Тривоги немає';
            updateTray(1); // Вызов функции для обновления трея
            await sendNotification(1, {region: selectedText}, cachedNotifications);
        }
    } catch (error) {
        console.error('Error fetching alert status:', error);

        statusText.textContent = 'Завантаження..';
        updateTray(0); // Вызов функции для обновления трея
        await sendNotification(0, {}, cachedNotifications);
    }
}

async function sendOnlyNotification(type=-1, params={}) {
    if (type == -1){
        type = lastStatus;
    }

    switch (type) {
        case 0:
            window.notification.sendConnectionLostNotification();
            break;
        case 1:
            window.notification.sendAllClearNotification(params.region);
            break;
        case 2:
            window.notification.sendAlertNotification(params.region);
            break;
    }
}

async function sendNotification(type, params={}, cache=True) {
    if (cache) {
        if (type == lastStatus) {
            return;
        }
    } else {
        lastStatus = type;
        return;
    }

    await sendOnlyNotification(type);

    lastStatus = type;
}

async function updateRegionSelect(regionSelect) {
    const regions = await window.api.getRegions();

    regionSelect.innerHTML = '<option value="" disabled selected>Виберіть область</option>';

    regions.forEach(region => {
        const option = document.createElement('option');
        option.value = region.id;
        option.textContent = region.name;
        regionSelect.appendChild(option);
    });
}

async function updateApi(regionSelect, statusText, imgElement, cachedNotifications=true) {
    await updateImage(imgElement);
    await updateStatus(regionSelect, statusText, cachedNotifications);
}