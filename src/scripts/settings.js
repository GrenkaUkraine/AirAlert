async function loadSettings() {
    window.settings.loadSettings().then((settings) => {
        if (settings) {
            setCheckbox('enableNotifictions', settings.enableNotifications);
            setCheckbox('notifySound', settings.notifySound);
            setCheckbox('notifyAlert', settings.notifyAlert);
            setCheckbox('notifyAllClear', settings.notifyAllClear);
            setSelectValue('regionSelect', settings.regionSelect || 0);
            setSelectValue('onClickSelect', settings.onClickSelect || 0);
        }
    });
}

function setCheckbox(elementId, value) {
    document.getElementById(elementId).checked = value;
}

function setSelectValue(elementId, index) {
    const selectElement = document.getElementById(elementId);
    selectElement.selectedIndex = index;

    console.log(`elementId: ${elementId} | index: ${index} | selectedIndex: ${selectElement.selectedIndex} | value: ${selectElement.value} | type of index: ${typeof index}`);
}

function saveSettings() {
    const settings = {
        enableNotifications: getCheckboxValue('enableNotifictions'),
        notifySound: getCheckboxValue('notifySound'),
        notifyAlert: getCheckboxValue('notifyAlert'),
        notifyAllClear: getCheckboxValue('notifyAllClear'),
        regionSelect: document.getElementById('regionSelect').selectedIndex,
        onClickSelect: document.getElementById('onClickSelect').selectedIndex,
    };

    window.settings.saveSettings(settings);
}

function getCheckboxValue(elementId) {
    return document.getElementById(elementId).checked;
}

// Установка обработчиков событий для чекбоксов
const checkboxIds = [
    'enableNotifictions',
    'notifySound',
    'notifyAlert',
    'notifyAllClear',
];

checkboxIds.forEach(id => {
    document.getElementById(id).addEventListener('change', saveSettings);
});

// Установка обработчиков событий для селектов
const selectIds = [
    'regionSelect',
    'onClickSelect',
];

selectIds.forEach(id => {
    document.getElementById(id).addEventListener('change', saveSettings);
});
