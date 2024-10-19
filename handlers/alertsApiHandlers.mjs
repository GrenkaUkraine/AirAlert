import { ipcMain } from 'electron';
import axios from 'axios';


const BASE_URL = 'https://alerts.com.ua/api/states';

function registerAlertsApiHandlers() {
    const API_KEY = process.env.API_KEY;

    ipcMain.handle('checkAlertStatus', async (event, regionId) => {
        try {
            const response = await axios.get(`${BASE_URL}/${regionId}`, {
                headers: { 'x-api-key': API_KEY }
            });
            return response.data.state.alert;
        } catch (error) {
            console.error('Error fetching alert status:', error);
            throw error;
        }
    });

    ipcMain.handle('getRegions', async () => {
        try {
            const response = await axios.get(BASE_URL, {
                headers: { 'x-api-key': API_KEY }
            });
            return response.data.states;
        } catch (error) {
            console.error('Error fetching regions:', error);
            throw error;
        }
    });
}

export default registerAlertsApiHandlers;