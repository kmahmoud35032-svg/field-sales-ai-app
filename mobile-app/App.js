import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { initDatabase } from './src/database/db';

export default function App() {
    useEffect(() => {
        initDatabase()
            .then(() => console.log('Database initialized'))
            .catch(err => console.error('Database init failed', err));
    }, []);

    return (
        <>
            <AppNavigator />
            <StatusBar style="auto" />
        </>
    );
}
