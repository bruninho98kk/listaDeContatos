import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configurações 🔧</Text>
            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Nenhuma configuração disponível no momento</Text>
            </View>
            <Text style={styles.footerText}>Mais configurações em breve...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f9fc', // Fundo claro
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50', // Azul escuro
        textAlign: 'center',
        marginBottom: 24,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#ffffff', // Fundo branco
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 16,
    },
    settingText: {
        fontSize: 18,
        color: '#34495e', // Azul acinzentado
        textAlign: 'center',
    },
    footerText: {
        textAlign: 'center',
        color: '#95a5a6', // Cinza claro
        fontSize: 14,
        marginTop: 32,
        fontStyle: 'italic',
    },
});