import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  FlatList,
  Alert,
  StyleSheet
} from 'react-native';

// Formata o telefone em tempo real
function formatPhoneNumber(number) {
  const cleaned = number.replace(/\D/g, '').slice(0, 11); // Limita a 11 dígitos

  if (cleaned.length <= 2) {
    return `(${cleaned}`;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  } else if (cleaned.length <= 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  } else {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
}

export default function HomeScreen() {
  const [contacts, setContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Amigo'); // Categoria padrão
  const [editIndex, setEditIndex] = useState(null);

  function addOrEditContact() {
    if (!newName || !newPhone) return;

    const updatedContacts = [...contacts];
    const formattedPhone = formatPhoneNumber(newPhone);

    if (editIndex === null) {
      updatedContacts.push({ name: newName, phone: formattedPhone, category: selectedCategory });
    } else {
      updatedContacts[editIndex] = { name: newName, phone: formattedPhone, category: selectedCategory };
      setEditIndex(null);
    }

    setContacts(updatedContacts);
    setNewName('');
    setNewPhone('');
    setSelectedCategory('Amigo'); // Reseta a categoria para o padrão
    setModalVisible(false);
  }

  function confirmDelete(index) {
    Alert.alert(
      'Excluir contato?',
      `Remover "${contacts[index].name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            const updatedContacts = [...contacts];
            updatedContacts.splice(index, 1);
            setContacts(updatedContacts);
          },
        },
      ]
    );
  }

  function openEditModal(index) {
    setNewName(contacts[index].name);
    setNewPhone(contacts[index].phone);
    setSelectedCategory(contacts[index].category || 'Amigo'); // Carrega a categoria existente
    setEditIndex(index);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item, index }) => (
          <View style={styles.taskItemContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.taskItem}>{item.name}</Text>
              <Text style={styles.taskItemPhone}>{item.phone}</Text>
              <Text style={styles.taskItemCategory}>{item.category}</Text>
            </View>
            <View style={styles.taskButtons}>
              <Pressable
                onPress={() => openEditModal(index)}
                style={[styles.taskButton, styles.editButton]}
              >
                <Text style={styles.buttonText}><Feather name="edit" size={24} color="black" /></Text>
              </Pressable>
              <Pressable
                onPress={() => confirmDelete(index)}
                style={[styles.taskButton, styles.deleteButton]}
              >
                <Text style={styles.buttonText}><Feather name="trash-2" size={24} color="black" /></Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum contato adicionado!</Text>
        }
      />

      {/* Botão flutuante de novo contato */}
      <Pressable
        onPress={() => {
          setNewName('');
          setNewPhone('');
          setSelectedCategory('Amigo');
          setEditIndex(null);
          setModalVisible(true);
        }}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>＋</Text>
      </Pressable>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editIndex === null ? 'Novo Contato' : 'Editar Contato'}
            </Text>
            <TextInput
              value={newName}
              onChangeText={setNewName}
              placeholder="Nome"
              style={styles.input}
            />
            <TextInput
              value={newPhone}
              onChangeText={(text) => setNewPhone(formatPhoneNumber(text))}
              placeholder="Telefone"
              keyboardType="phone-pad"
              style={styles.input}
            />
            <View style={styles.categoryContainer}>
              {['Amigo', 'Família', 'Trabalho'].map((category) => (
                <Pressable
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.categoryButtonSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === category && styles.categoryButtonTextSelected,
                    ]}
                  >
                    {category}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Pressable onPress={addOrEditContact} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>
                {editIndex === null ? 'Adicionar' : 'Salvar'}
              </Text>
            </Pressable>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f4f8', // Fundo mais claro e moderno
      padding: 16,
    },
    addButton: {
      position: 'absolute',
      bottom: 16,
      right: 16,
      backgroundColor: '#4CAF50', // Verde vibrante
      padding: 12,
      borderRadius: 30,
      height: 60,
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 28,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    taskItemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      padding: 16,
      backgroundColor: '#ffffff', // Fundo branco para contraste
      borderRadius: 12, // Bordas arredondadas
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
      borderWidth: 1,
      borderColor: '#e0e0e0', // Borda sutil
    },
    taskItem: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 4,
    },
    taskItemPhone: {
      fontSize: 14,
      color: '#555',
      marginBottom: 2,
    },
    taskItemCategory: {
      fontSize: 12,
      color: '#888',
      fontStyle: 'italic',
    },
    taskButtons: {
      flexDirection: 'row',
    },
    taskButton: {
      marginLeft: 8,
      padding: 8,
      borderRadius: 8,
      backgroundColor: '#f5f5f5', // Fundo cinza claro
      elevation: 2,
    },
    editButton: {
      backgroundColor: '#FFC107', // Amarelo para editar
    },
    deleteButton: {
      backgroundColor: '#F44336', // Vermelho para excluir
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 32,
      color: '#666',
      fontSize: 16,
      fontStyle: 'italic',
    },
    modalBackdrop: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)', // Fundo escuro translúcido
    },
    modalContent: {
      width: '90%',
      backgroundColor: '#ffffff',
      padding: 24,
      borderRadius: 16, // Bordas mais arredondadas
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      color: '#333',
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
      backgroundColor: '#f9f9f9',
      fontSize: 16,
    },
    categoryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 16,
    },
    categoryButton: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      backgroundColor: '#f9f9f9',
    },
    categoryButtonSelected: {
      backgroundColor: '#4CAF50', // Verde para categoria selecionada
      borderColor: '#4CAF50',
    },
    categoryButtonText: {
      color: '#333',
    },
    categoryButtonTextSelected: {
      color: '#fff',
    },
    saveButton: {
      backgroundColor: '#4CAF50', // Verde para salvar
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 8,
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    cancelButtonText: {
      color: '#888',
      textAlign: 'center',
      fontSize: 14,
      marginTop: 8,
    },
  });