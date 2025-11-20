import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../contexts/products/models/product";

export interface ShoppingCartItem extends Product {
  quantity: number;
}

export interface ShoppingCartState {
  items: ShoppingCartItem[];
  totalQuantity: number;
}

const initialState: ShoppingCartState = {
  items: [],
  totalQuantity: 0,
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalQuantity += 1;
    },
    removeItem(state, action: PayloadAction<number>) {
      const id = action.payload;
      const removedItem = state.items.find((item) => item.id === id);

      if (removedItem) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalQuantity -= removedItem.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
    },
    decrementItem(state, action: PayloadAction<number>) {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      if (state.totalQuantity > 0) state.totalQuantity -= 1;
    },
  },
});

export const { addItem, removeItem, clearCart, decrementItem } =
  shoppingCartSlice.actions;

export const shoppingCart = shoppingCartSlice.reducer;
