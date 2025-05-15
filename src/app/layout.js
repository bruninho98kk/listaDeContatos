import React from 'react';
import { Stack } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Layout() {
    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#4CAF50', // Verde vibrante para o cabeçalho
                    shadowColor: 'rgba(0, 0, 0, 0.2)', // Sombra sutil
                    shadowOpacity: 0.8,
                    shadowRadius: 4,
                },
                headerTintColor: '#fff', // Cor do texto no cabeçalho (branco)
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                },
                headerBackTitleVisible: false, // Remove o texto do botão de voltar
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: '📋 Lista de Contatos', // Adiciona um ícone ao título
                    headerRight: () => (
                        <Pressable
                            onPress={() => router.push('/settings')} // Navegação para a tela de configurações
                            style={styles.gearButton}
                        >
                            <FontAwesome5 name="cog" size={24} color="#fff" />
                        </Pressable>
                    ),
                }}
            />
            <Stack.Screen
                name="settings"
                options={{
                    title: '⚙️ Configurações', // Título com ícone
                    headerStyle: {
                        backgroundColor: '#007BFF', // Azul vibrante para a tela de configurações
                    },
                }}
            />
        </Stack>
    );
}

// Estilos aplicados
const styles = StyleSheet.create({
    gearButton: {
        marginRight: 16, // Espaçamento para o ícone de configurações
        padding: 8, // Área de toque maior
        borderRadius: 8, // Bordas arredondadas para o botão
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Fundo translúcido para o botão
    },
});