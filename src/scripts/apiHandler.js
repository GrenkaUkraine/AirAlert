const imageUrl = 'https://alerts.com.ua/map.png';
const loadingAlertsMapImageSrc = '../assets/img/map.png';

const alertSound = new Audio('../assets/audio/alert.mp3');
const allClearSound = new Audio('../assets/audio/allClear.mp3');
const loadingSound = new Audio('../assets/audio/loading.mp3');

let lastStatus = 0;
let loadedNow = false;

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
            window.tray.updateTray(0);
            break;
        case 1:
            window.tray.updateTray(1);
            break;
        case 2:
            window.tray.updateTray(2);
            break;
    }
}

async function updateStatus(regionSelect, statusText, cachedNotifications=true) {
    if (!(regionSelect && statusText)) {
        return;
    }

    const regionId = regionSelect.value;
    const selectedOption = regionSelect.options[regionSelect.selectedIndex];
    const selectedText = selectedOption.text;
    console.log(`${regionSelect.selectedIndex} | ${selectedOption} | ${selectedText}`);

    try {
        const alertStatus = await window.api.checkAlertStatus(regionId);
        
        if (alertStatus) {
            statusText.textContent = 'Повітряна тривога!';

            statusText.classList.add('accent-red-color');
            statusText.classList.remove('accent-green-color');

            updateTray(2);
            await sendNotification(2, {region: selectedText}, cachedNotifications);
        } else {
            statusText.textContent = 'Тривоги немає';

            statusText.classList.add('accent-green-color');
            statusText.classList.remove('accent-red-color');

            updateTray(1);
            await sendNotification(1, {region: selectedText}, cachedNotifications);
        }
    } catch (error) {
        console.error('Error fetching alert status:', error);

        statusText.textContent = 'Завантаження..';

        statusText.classList.remove('accent-green-color');
        statusText.classList.remove('accent-red-color');
        
        updateTray(0);
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
            loadingSound.play();
            break;
        case 1:
            window.notification.sendAllClearNotification(params.region);
            allClearSound.play();
            break;
        case 2:
            window.notification.sendAlertNotification(params.region);
            alertSound.play();
            break;
    }
}

async function sendNotification(type, params={}, cache=true) {    
    if (cache && !loadedNow) {
        if (type == lastStatus) {
            return;
        }
    } else {
        lastStatus = type;
        loadedNow = false;
        
        return;
    }

    await sendOnlyNotification(type, params);
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