import { describe, it, expect } from "vitest";
import {
  shoppingCart,
  addCartItem,
  removeCartItem,
  clearCart,
  updateCartItemQuantity,
} from "./shopping-cart";
import type { Product } from "../../contexts/products/models/product";

describe("ShoppingCartSlice", () => {
  const mockProduct1: Product = {
    id: 1,
    title: "Camiseta Azul",
    price: 79.9,
    description: "Camiseta confortável",
    category: "men's clothing",
    image: "https://example.com/camiseta.jpg",
    rating: { rate: 4.5, count: 89 },
  };

  const mockProduct2: Product = {
    id: 2,
    title: "Calça Jeans",
    price: 189.9,
    description: "Calça resistente",
    category: "men's clothing",
    image: "https://example.com/jeans.jpg",
    rating: { rate: 4.8, count: 210 },
  };

  const initialState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  };

  describe("initial state", () => {
    it("Should start with empty cart", () => {
      const state = shoppingCart(undefined, { type: "unknown" });
      expect(state).toEqual(initialState);
    });
  });

  describe("addCartItem", () => {
    it("Should add a new product to an empty cart", () => {
      const state = shoppingCart(initialState, addCartItem(mockProduct1));

      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toMatchObject({
        ...mockProduct1,
        quantity: 1,
      });
      expect(state.totalQuantity).toBe(1);
      expect(state.totalPrice).toBe(79.9);
    });

    it("Should increment quantity when adding the same product again", () => {
      const stateAfterFirstAdd = shoppingCart(
        initialState,
        addCartItem(mockProduct1),
      );
      const finalState = shoppingCart(
        stateAfterFirstAdd,
        addCartItem(mockProduct1),
      );

      expect(finalState.items).toHaveLength(1);
      expect(finalState.items[0].quantity).toBe(2);
      expect(finalState.totalQuantity).toBe(2);
      expect(finalState.totalPrice).toBe(79.9 * 2);
    });

    it("Should correctly add multiple different products", () => {
      let state = shoppingCart(initialState, addCartItem(mockProduct1));
      state = shoppingCart(state, addCartItem(mockProduct2));

      expect(state.items).toHaveLength(2);
      expect(state.totalQuantity).toBe(2);
      expect(state.totalPrice).toBe(79.9 + 189.9);
    });
  });

  describe("removeCartItem", () => {
    it("Should remove an existing item completely", () => {
      let state = shoppingCart(initialState, addCartItem(mockProduct1));
      state = shoppingCart(state, addCartItem(mockProduct1));
      state = shoppingCart(state, addCartItem(mockProduct2));

      const finalState = shoppingCart(state, removeCartItem(1));

      expect(finalState.items).toHaveLength(1);
      expect(finalState.items[0].id).toBe(2);
      expect(finalState.totalQuantity).toBe(1);
      expect(finalState.totalPrice).toBe(189.9);
    });

    it("Should do nothing if item does not exist", () => {
      const state = shoppingCart(initialState, addCartItem(mockProduct1));
      const finalState = shoppingCart(state, removeCartItem(999));

      expect(finalState).toEqual(state);
    });
  });

  describe("updateCartItemQuantity", () => {
    it("Should increase quantity and totals correctly", () => {
      const state = shoppingCart(initialState, addCartItem(mockProduct1));

      const finalState = shoppingCart(
        state,
        updateCartItemQuantity({ productId: 1, quantity: 5 }),
      );

      expect(finalState.items[0].quantity).toBe(5);
      expect(finalState.totalQuantity).toBe(5);
      expect(finalState.totalPrice).toBeCloseTo(79.9 * 5, 2);
    });

    it("Should decrease quantity and totals correctly", () => {
      let state = shoppingCart(initialState, addCartItem(mockProduct1));
      state = shoppingCart(state, addCartItem(mockProduct1));
      state = shoppingCart(state, addCartItem(mockProduct1));

      const finalState = shoppingCart(
        state,
        updateCartItemQuantity({ productId: 1, quantity: 1 }),
      );

      expect(finalState.items[0].quantity).toBe(1);
      expect(finalState.totalQuantity).toBe(1);
      expect(finalState.totalPrice).toBe(79.9);
    });

    it("Should allow setting quantity to 0 (effectively removing item from view)", () => {
      const state = shoppingCart(initialState, addCartItem(mockProduct1));

      const finalState = shoppingCart(
        state,
        updateCartItemQuantity({ productId: 1, quantity: 0 }),
      );

      expect(finalState.items[0].quantity).toBe(0);
      expect(finalState.totalQuantity).toBe(0);
      expect(finalState.totalPrice).toBe(0);
    });

    it("Should do nothing if product is not in cart", () => {
      const state = shoppingCart(initialState, addCartItem(mockProduct1));
      const finalState = shoppingCart(
        state,
        updateCartItemQuantity({ productId: 999, quantity: 10 }),
      );

      expect(finalState).toEqual(state);
    });
  });

  describe("clearCart", () => {
    it("Should reset cart to initial state", () => {
      let state = shoppingCart(initialState, addCartItem(mockProduct1));
      state = shoppingCart(state, addCartItem(mockProduct2));
      state = shoppingCart(state, addCartItem(mockProduct1));

      const finalState = shoppingCart(state, clearCart());

      expect(finalState).toEqual(initialState);
    });
  });

  it("Should handle a complete shopping flow correctly", () => {
    let state = shoppingCart(undefined, addCartItem(mockProduct1));
    state = shoppingCart(state, addCartItem(mockProduct1));
    state = shoppingCart(state, addCartItem(mockProduct2));

    state = shoppingCart(
      state,
      updateCartItemQuantity({ productId: 1, quantity: 4 }),
    );
    state = shoppingCart(state, removeCartItem(2));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(1);
    expect(state.items[0].quantity).toBe(4);
    expect(state.totalQuantity).toBe(4);
    expect(state.totalPrice).toBeCloseTo(79.9 * 4, 2);
  });
});
