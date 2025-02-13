import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, FlatList, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import { addMeal, toggleMeal } from '../redux/mealSlice';

const DietScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [newMeal, setNewMeal] = useState({ mainDish: '', sideDish: '', drink: '', name: '' });
  const dispatch = useDispatch();
  const mealDetails = useSelector((state) => state.meal.mealDetails);

  const handleAddMeal = () => {
    if (newMeal.name.trim() !== '' && (newMeal.mainDish || newMeal.sideDish || newMeal.drink)) {
      dispatch(addMeal(newMeal));
      setNewMeal({ mainDish: '', sideDish: '', drink: '', name: '' });
      setModalVisible(false);
    } else {
      Alert.alert('Hata', 'Lütfen en az bir kategori ve öğün adı giriniz.');
    }
  };

  const handleToggleMeal = (index) => {
    dispatch(toggleMeal(index));
  };

  const renderMealItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.mealItemContainer, item.completed && styles.mealItemCompleted]}
      onPress={() => handleToggleMeal(index)}
    >
      <Text style={styles.mealItem}>{item.id}. Öğün: {item.name}</Text>
      {item.mainDish && <Text style={styles.mealSubItem}>Ana Yemek: {item.mainDish}</Text>}
      {item.sideDish && <Text style={styles.mealSubItem}>Yan Ürün: {item.sideDish}</Text>}
      {item.drink && <Text style={styles.mealSubItem}>İçecek: {item.drink}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diyet Programı</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Öğün Ekle</Text>
      </TouchableOpacity>

      {mealDetails.length === 0 ? (
        <Text style={styles.empty}>Henüz bir öğün eklemediniz!</Text>
      ) : (
        <FlatList
          data={mealDetails}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMealItem}
        />
      )}

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Yeni Öğün Ekle</Text>
            <TextInput
              style={styles.input}
              placeholder="Kategori (Ana Yemek)"
              value={newMeal.mainDish}
              onChangeText={(text) => setNewMeal({ ...newMeal, mainDish: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Kategori (Yan Ürün)"
              value={newMeal.sideDish}
              onChangeText={(text) => setNewMeal({ ...newMeal, sideDish: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Kategori (İçecek vb.)"
              value={newMeal.drink}
              onChangeText={(text) => setNewMeal({ ...newMeal, drink: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Öğün Adı"
              value={newMeal.name}
              onChangeText={(text) => setNewMeal({ ...newMeal, name: text })}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: 'red' }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Kapat</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleAddMeal}>
                <Text style={styles.modalButtonText}>Ekle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DietScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  empty: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  mealItemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  mealItemCompleted: {
    backgroundColor: '#4CAF50',
  },
  mealItem: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mealSubItem: {
    fontSize: 16,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});