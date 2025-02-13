import { configureStore } from '@reduxjs/toolkit';
import exerciseReducer from '../redux/exerciseSlice';
import mealReducer from '../redux/mealSlice';

const store = configureStore({
  reducer: {
    exercise: exerciseReducer,
    meal: mealReducer,
  },
});

export default store;