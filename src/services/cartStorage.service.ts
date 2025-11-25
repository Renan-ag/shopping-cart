import type { ShoppingCartState } from "../store/slices/shopping-cart";

const STORAGE_KEY = "shopping_cart";

export const cartStorage = {
  save(state: ShoppingCartState) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },

  load(): ShoppingCartState | null {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    try {
      return JSON.parse(data) as ShoppingCartState;
    } catch {
      return null;
    }
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
