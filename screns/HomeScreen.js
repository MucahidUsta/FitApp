import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const ExerciseScreen = () => {
  const [newExercise, setNewExercise] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [exerciseDetails, setExerciseDetails] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOrEditExercise = () => {
    if (newExercise.trim() !== '' && sets.trim() !== '' && reps.trim() !== '') {
      const totalSets = parseInt(sets);
      const exerciseData = {
        name: newExercise.trim(),
        sets: totalSets,
        reps: parseInt(reps),
        completedSets: Array(totalSets).fill(false),
      };

      if (editingIndex !== null) {
        const updatedDetails = [...exerciseDetails];
        updatedDetails[editingIndex] = exerciseData;
        setExerciseDetails(updatedDetails);
        setEditingIndex(null);
      } else {
        setExerciseDetails([...exerciseDetails, exerciseData]);
      }

      setNewExercise('');
      setSets('');
      setReps('');
      setModalVisible(false);
    }
  };

  const handleEditExercise = (index) => {
    const exercise = exerciseDetails[index];
    setNewExercise(exercise.name);
    setSets(exercise.sets.toString());
    setReps(exercise.reps.toString());
    setEditingIndex(index);
    setModalVisible(true);
  };

  const handleDeleteExercise = (index) => {
    const updatedDetails = exerciseDetails.filter((_, i) => i !== index);
    setExerciseDetails(updatedDetails);
  };

  const handleToggleSet = (exerciseIndex, setIndex) => {
    const updatedDetails = [...exerciseDetails];

    if (setIndex > 0 && !updatedDetails[exerciseIndex].completedSets[setIndex - 1]) {
      Alert.alert('Uyarı', 'Önceki seti tamamlamalısınız.');
      return;
    }

    updatedDetails[exerciseIndex].completedSets[setIndex] = !updatedDetails[exerciseIndex].completedSets[setIndex];

    const allSetsCompleted = updatedDetails[exerciseIndex].completedSets.every((set) => set);
    if (allSetsCompleted) {
      if (exerciseIndex < exerciseDetails.length - 1) {
        Alert.alert('Tebrikler!', 'Sıradaki harekete geçebilirsiniz.');
        setCurrentExerciseIndex(exerciseIndex + 1);
      } else {
        Alert.alert('Tebrikler!', 'Bugünlük egzersizinizi tamamladınız!');
      }
    }

    setExerciseDetails(updatedDetails);
  };

  const renderExerciseItem = ({ item, index }) => (
    <View style={styles.exerciseContainer}>
      <Text style={styles.exerciseTitle}>{index + 1}. {item.name}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleEditExercise(index)}>
          <Text style={styles.actionButtonText}>Düzenle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'red' }]} onPress={() => handleDeleteExercise(index)}>
          <Text style={styles.actionButtonText}>Sil</Text>
        </TouchableOpacity>
      </View>
      {item.completedSets.map((completed, setIndex) => (
        <TouchableOpacity
          key={setIndex}
          onPress={() => handleToggleSet(index, setIndex)}
          style={[styles.setButton, completed && styles.setButtonCompleted]}
        >
          <Text style={styles.setText}>{setIndex + 1}. set - {item.reps} tekrar</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spor Hareketler</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Hareket Ekle</Text>
      </TouchableOpacity>
      <FlatList
        data={exerciseDetails}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderExerciseItem}
        ListEmptyComponent={<Text style={styles.empty}>Henüz bir hareket eklemediniz!</Text>}
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editingIndex !== null ? 'Hareketi Düzenle' : 'Yeni Hareket Ekle'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Hareket adı"
              value={newExercise}
              onChangeText={setNewExercise}
            />
            <TextInput
              style={styles.input}
              placeholder="Kaç set?"
              keyboardType="numeric"
              value={sets}
              onChangeText={setSets}
            />
            <TextInput
              style={styles.input}
              placeholder="Kaç tekrar?"
              keyboardType="numeric"
              value={reps}
              onChangeText={setReps}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: 'red' }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleAddOrEditExercise}>
                <Text style={styles.modalButtonText}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const DietScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [mealDetails, setMealDetails] = useState([]);
  const [newMeal, setNewMeal] = useState({ mainDish: '', sideDish: '', drink: '', name: '' });

  const handleAddMeal = () => {
    if (newMeal.name.trim() !== '' && (newMeal.mainDish || newMeal.sideDish || newMeal.drink)) {
      const updatedMeals = [
        ...mealDetails,
        {
          id: mealDetails.length + 1,
          mainDish: newMeal.mainDish.trim(),
          sideDish: newMeal.sideDish.trim(),
          drink: newMeal.drink.trim(),
          name: newMeal.name.trim(),
          completed: false,
        },
      ];
      setMealDetails(updatedMeals);
      setNewMeal({ mainDish: '', sideDish: '', drink: '', name: '' });
      setModalVisible(false);
    } else {
      Alert.alert('Hata', 'Lütfen en az bir kategori ve öğün adı giriniz.');
    }
  };

  const handleToggleMeal = (index) => {
    const updatedMeals = [...mealDetails];
    updatedMeals[index].completed = !updatedMeals[index].completed;
    setMealDetails(updatedMeals);
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

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Spor') {
              return <FontAwesome5 name="dumbbell" size={size} color={color} />;
            } else if (route.name === 'Diyet') {
              return <MaterialIcons name="restaurant" size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#f4f4f4',
            borderTopWidth: 0,
          },
        })}
      >
        <Tab.Screen name="Spor" component={ExerciseScreen} />
        <Tab.Screen name="Diyet" component={DietScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

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
  exerciseContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  setButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  setButtonCompleted: {
    backgroundColor: '#4CAF50',
  },
  setText: {
    fontSize: 16,
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
});