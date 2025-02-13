import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { addOrEditExercise, deleteExercise, toggleSet } from '../redux/exerciseSlice';

const ExerciseScreen = () => {
  const [newExercise, setNewExercise] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const dispatch = useDispatch();
  const exerciseDetails = useSelector((state) => state.exercise.exerciseDetails);

  const handleAddOrEditExercise = () => {
    if (newExercise.trim() !== '' && sets.trim() !== '' && reps.trim() !== '') {
      dispatch(addOrEditExercise({ newExercise, sets, reps, editingIndex }));
      setNewExercise('');
      setSets('');
      setReps('');
      setModalVisible(false);
      setEditingIndex(null);
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
    dispatch(deleteExercise(index));
  };

  const handleToggleSet = (exerciseIndex, setIndex) => {
    dispatch(toggleSet({ exerciseIndex, setIndex }));
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

export default ExerciseScreen;

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
});