import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mealDetails: [],
};

const mealSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {
    addMeal: (state, action) => {
      const { mainDish, sideDish, drink, name } = action.payload;
      state.mealDetails.push({
        id: state.mealDetails.length + 1,
        mainDish: mainDish.trim(),
        sideDish: sideDish.trim(),
        drink: drink.trim(),
        name: name.trim(),
        completed: false,
      });
    },
    toggleMeal: (state, action) => {
      const index = action.payload;
      state.mealDetails[index].completed = !state.mealDetails[index].completed;
    },
  },
});

export const { addMeal, toggleMeal } = mealSlice.actions;
export default mealSlice.reducer;