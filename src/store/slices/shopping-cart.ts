import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../contexts/products/models/product";

export interface ShoppingCartItem extends Product {
  quantity: number;
}

export interface ShoppingCartState {
  items: ShoppingCartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: ShoppingCartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<Product>) {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
    },
    removeCartItem(state, action: PayloadAction<number>) {
      const id = action.payload;
      const removedItem = state.items.find((item) => item.id === id);

      if (removedItem) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalQuantity -= removedItem.quantity;
        state.totalPrice -= removedItem.price * removedItem.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    updateCartItemQuantity(
      state,
      action: PayloadAction<{ productId: number; quantity: number }>,
    ) {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === productId);

      if (item) {
        const previousQuantity = item.quantity;
        item.quantity = quantity;

        state.totalQuantity += quantity - previousQuantity;
        state.totalPrice += (quantity - previousQuantity) * item.price;
      }
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  clearCart,
  updateCartItemQuantity,
} = shoppingCartSlice.actions;

export const shoppingCart = shoppingCartSlice.reducer;
