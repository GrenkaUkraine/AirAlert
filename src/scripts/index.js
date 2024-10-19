const imgElement = document.getElementById('alertsMap');

const regionSelect = document.getElementById('regionSelect');
const statusText = document.getElementById('statusText');

document.getElementById('testNotify').addEventListener('click', async () => {
    await sendOnlyNotification(-1, {region: 'ТЕСТ!'});
});

regionSelect.addEventListener('change', async () => {
    await updateApi(regionSelect, statusText, imgElement, false);
});

updateRegionSelect(regionSelect);

setInterval(() => {
    updateApi(regionSelect, statusText, imgElement);
}, 15000);

updateApi();