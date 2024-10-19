import sqlite3 from 'sqlite3';
import { app } from 'electron';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(app.getPath('appData'), 'GrenkaUkraine', 'AirAlert', 'data.db');

// Создаем директорию, если она не существует
if (!fs.existsSync(path.dirname(dbPath))) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

// Открываем базу данных
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        // Создаем таблицу, если она не существует
        db.run(`CREATE TABLE IF NOT EXISTS settings (
            id INTEGER PRIMARY KEY,
            enableNotifications BOOLEAN,
            notifySound BOOLEAN,
            notifyAlert BOOLEAN,
            notifyAllClear BOOLEAN,
            regionSelect INTEGER,
            onClickSelect INTEGER
        )`, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                // Проверяем, существует ли первая строка, и создаем ее, если нет
                db.get(`SELECT * FROM settings WHERE id = 1`, [], (err, row) => {
                    if (!row) {
                        db.run(`INSERT INTO settings (id, enableNotifications, notifySound, notifyAlert, notifyAllClear, regionSelect, onClickSelect) 
                                VALUES (1, true, true, true, true, 0, 0)`, (err) => {
                            if (err) {
                                console.error(err.message);
                            }
                        });
                    }
                });
            }
        });
    }
});

// Функция для сохранения настроек (обновление первой строки)
export function saveSettings(settings) {
    const { enableNotifications, notifySound, notifyAlert, notifyAllClear, regionSelect, onClickSelect } = settings;

    db.run(`UPDATE settings 
            SET enableNotifications = ?, 
                notifySound = ?, 
                notifyAlert = ?, 
                notifyAllClear = ?, 
                regionSelect = ?, 
                onClickSelect = ? 
            WHERE id = 1`, 
            [enableNotifications, notifySound, notifyAlert, notifyAllClear, regionSelect, onClickSelect],
            function(err) {
                if (err) {
                    console.error(err.message);
                }
            });
}

// Функция для загрузки настроек
export function loadSettings(callback) {
    db.get(`SELECT * FROM settings WHERE id = 1`, [], (err, row) => {
        if (err) {
            console.error(err.message);
        }
        callback(row);
    });
}
