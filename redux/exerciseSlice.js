import { createSlice } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
const initialState = {
  exerciseDetails: [],
  currentExerciseIndex: 0,
};

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    addOrEditExercise: (state, action) => {
      const { newExercise, sets, reps, editingIndex } = action.payload;
      const totalSets = parseInt(sets);
      const exerciseData = {
        name: newExercise.trim(),
        sets: totalSets,
        reps: parseInt(reps),
        completedSets: Array(totalSets).fill(false),
      };

      if (editingIndex !== null && editingIndex !== undefined) {
        state.exerciseDetails[editingIndex] = exerciseData;
      } else {
        state.exerciseDetails.push(exerciseData);
      }
    },
    deleteExercise: (state, action) => {
      state.exerciseDetails = state.exerciseDetails.filter((_, i) => i !== action.payload);
    },
    toggleSet: (state, action) => {
      const { exerciseIndex, setIndex } = action.payload;
      const updatedDetails = [...state.exerciseDetails];

      if (setIndex > 0 && !updatedDetails[exerciseIndex].completedSets[setIndex - 1]) {
        Alert.alert('Uyarı', 'Önceki seti tamamlamalısınız.');
        return;
      }

      updatedDetails[exerciseIndex].completedSets[setIndex] = !updatedDetails[exerciseIndex].completedSets[setIndex];

      const allSetsCompleted = updatedDetails[exerciseIndex].completedSets.every((set) => set);
      if (allSetsCompleted) {
        if (exerciseIndex < updatedDetails.length - 1) {
          Alert.alert('Tebrikler!', 'Sıradaki harekete geçebilirsiniz.');
          state.currentExerciseIndex = exerciseIndex + 1;
        } else {
          Alert.alert('Tebrikler!', 'Bugünlük egzersizinizi tamamladınız!');
        }
      }

      state.exerciseDetails = updatedDetails;
    },
  },
});

export const { addOrEditExercise, deleteExercise, toggleSet } = exerciseSlice.actions;
export default exerciseSlice.reducer;