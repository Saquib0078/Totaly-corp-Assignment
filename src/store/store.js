import {configureStore} from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
const persistedCart = localStorage.getItem('cart');
const initialState = persistedCart ? JSON.parse(persistedCart) : [];
const store=configureStore({
    
    reducer:{
        cart:cartSlice,
    },
    preloadedState: {
        cart: initialState,
      }
})



export default store;