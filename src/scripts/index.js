const imgElement = document.getElementById('alertsMap');

const regionSelect = document.getElementById('regionSelect');
const statusText = document.getElementById('statusText');

document.getElementById('testNotify').addEventListener('click', async () => {
    await sendOnlyNotification(-1, {region: 'ТЕСТ!'});
});

regionSelect.addEventListener('change', async () => {
    await updateApi(regionSelect, statusText, imgElement, false);
});

loadedNow = true;

setInterval(async () => {
    await updateApi(regionSelect, statusText, imgElement);
}, 15000);

window.onload = async () => {
    await updateRegionSelect(regionSelect);
    await loadSettings();
    await updateApi(regionSelect, statusText, imgElement, false);
};