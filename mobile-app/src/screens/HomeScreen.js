import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getClients, insertClient } from '../database/db';

const HomeScreen = ({ navigation }) => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        try {
            // In real app, sync with backend first
            // const response = await axios.get(...)
            // response.data.forEach(client => insertClient(client))

            // Mock data if empty
            const localClients = await getClients();
            if (localClients.length === 0) {
                const mockClients = [
                    { id: 1, name: 'Al-Amal Grocery', address: 'Riyadh', type: 'GROCERY' },
                    { id: 2, name: 'Hyper Panda', address: 'Riyadh', type: 'HYPERMARKET' },
                ];
                // Insert mock
                // await Promise.all(mockClients.map(c => insertClient(c)));
                setClients(mockClients);
            } else {
                setClients(localClients);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Visit', { client: item })}
        >
            <Text style={styles.clientName}>{item.name}</Text>
            <Text style={styles.clientType}>{item.type}</Text>
            <Text style={styles.clientAddress}>{item.address}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={clients}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    list: {
        padding: 10,
    },
    card: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2,
    },
    clientName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    clientType: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    clientAddress: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
});

export default HomeScreen;
