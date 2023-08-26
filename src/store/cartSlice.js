import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeItem: (state, action) => {
      const itemIdToRemove = action.payload.id;
      const updatedState = state.filter(item => item.id !== itemIdToRemove);
      localStorage.setItem('cart', JSON.stringify(updatedState));
      return updatedState;
    },
    incrementQuantity(state, action) {
        const item = state.find(item => item.id === action.payload);
        if (item) {
          item.quantity += 1;
        }
      },
      decrementQuantity(state, action) {
        const item = state.find(item => item.id === action.payload);
        if (item) {
          item.quantity = Math.max(1, item.quantity - 1); // Ensure quantity doesn't go below 1
        }
  },
  
  
}
});


export const { addItem, removeItem, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
