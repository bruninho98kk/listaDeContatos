
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
                headerStyle: { backgroundColor: '#007bff' }, // Cor azul
                headerTintColor: '#fff', // Cor do texto no cabeçalho (branco)
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: 'Lista de Contatos',
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
                options={{ title: '⚙️ Configurações' }} // Título para a tela de configurações
            />
        </Stack>
    );
}

// Estilos aplicados
const styles = StyleSheet.create({
    gearButton: {
        marginRight: 16, // Espaçamento para o ícone de configurações
    },
});
