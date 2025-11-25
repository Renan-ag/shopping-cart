import type { Store } from "@reduxjs/toolkit";
import { cartStorage } from "../services/cartStorage.service";

export function syncCart(store: Store) {
  store.subscribe(() => {
    const state = store.getState().shoppingCart;
    cartStorage.save(state);
  });
}
