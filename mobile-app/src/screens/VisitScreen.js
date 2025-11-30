import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const VisitScreen = ({ route, navigation }) => {
    const { client } = route.params;
    const [status, setStatus] = useState('COMPLETED');
    const [notes, setNotes] = useState('');
    const [photo, setPhoto] = useState(null);

    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.5,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        // Save visit to local DB
        // await insertVisit(...)

        // Trigger sync or AI analysis

        Alert.alert('Success', 'Visit recorded successfully');
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.clientName}>{client.name}</Text>
                <Text style={styles.clientAddress}>{client.address}</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Visit Status</Text>
                <View style={styles.radioGroup}>
                    {['COMPLETED', 'SKIPPED', 'NOT_FOUND'].map(s => (
                        <TouchableOpacity
                            key={s}
                            style={[styles.radio, status === s && styles.radioSelected]}
                            onPress={() => setStatus(s)}
                        >
                            <Text style={[styles.radioText, status === s && styles.radioTextSelected]}>{s}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.label}>Notes</Text>
                <TextInput
                    style={styles.input}
                    multiline
                    numberOfLines={4}
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="Enter visit notes..."
                />

                <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
                    <Text style={styles.photoButtonText}>{photo ? 'Retake Photo' : 'Take Shelf Photo'}</Text>
                </TouchableOpacity>

                {photo && <Text style={styles.photoPath}>Photo captured</Text>}

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit Visit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    clientName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    clientAddress: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    form: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    input: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        textAlignVertical: 'top',
    },
    radioGroup: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    radio: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#007AFF',
        marginRight: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    radioSelected: {
        backgroundColor: '#007AFF',
    },
    radioText: {
        color: '#007AFF',
    },
    radioTextSelected: {
        color: 'white',
    },
    photoButton: {
        backgroundColor: '#5856D6',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    photoButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    photoPath: {
        marginBottom: 20,
        color: 'green',
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: '#34C759',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default VisitScreen;
