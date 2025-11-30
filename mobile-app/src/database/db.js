import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('fieldsurvey.db');

export const initDatabase = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS clients (
          id INTEGER PRIMARY KEY NOT NULL,
          remoteId INTEGER,
          name TEXT NOT NULL,
          address TEXT,
          latitude REAL,
          longitude REAL,
          type TEXT,
          lastVisit TEXT,
          synced INTEGER DEFAULT 0
        );`,
                [],
                () => {
                    tx.executeSql(
                        `CREATE TABLE IF NOT EXISTS visits (
              id INTEGER PRIMARY KEY NOT NULL,
              clientId INTEGER,
              date TEXT,
              status TEXT,
              latitude REAL,
              longitude REAL,
              notes TEXT,
              synced INTEGER DEFAULT 0
            );`,
                        [],
                        () => resolve(),
                        (_, err) => reject(err)
                    );
                },
                (_, err) => reject(err)
            );
        });
    });
};

export const insertClient = (client) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO clients (remoteId, name, address, latitude, longitude, type, lastVisit) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [client.id, client.name, client.address, client.latitude, client.longitude, client.type, client.lastVisit],
                (_, result) => resolve(result),
                (_, err) => reject(err)
            );
        });
    });
};

export const getClients = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM clients`,
                [],
                (_, { rows: { _array } }) => resolve(_array),
                (_, err) => reject(err)
            );
        });
    });
};
