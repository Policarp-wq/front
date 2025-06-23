import { createSlice, type PayloadAction,} from '@reduxjs/toolkit';
import type { Product } from '../models/types';
import type { RootState } from './store';

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartState = Record<number, CartItem>; 

const initialState: CartState = {};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const id = action.payload.id;

      if (state[id]) {
        state[id].quantity += 1;
      } else {
        state[id] = {
          product: action.payload,
          quantity: 1,
        };
      }
    },
    setAmount(state, action: PayloadAction<{id: number, value: number}>) {
      const id = action.payload.id;
      const val = action.payload.value;
      if (state[id]) {
        if(val <= 0){
          delete state[id];
          return;
        }
        state[id].quantity = val;
      }
    },

    removeFromCart(state, action: PayloadAction<number>) {
      delete state[action.payload];
    },

    decreaseQuantity(state, action: PayloadAction<number>) {
      const id = action.payload;
      const item = state[id];

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          delete state[id];
        }
      }
    },

    clearCart() {
      return {};
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setAmount,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export const selectItems = (state: RootState) => Object.values(state.cart);
export const selectTotal = (state: RootState) => {
  const items = Object.values(state.cart);
  if (items.length === 0) return 0;
  return items.map(v => v.product.price * v.quantity).reduce((prev, cur) => prev + cur, 0);
};
export default cartSlice.reducer;
