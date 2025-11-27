import { useAppDispatch } from "../../../store";
import {
  clearCart,
  removeCartItem,
  updateCartItemQuantity,
} from "../../../store/slices/shopping-cart";

export function useShoppingCartActions() {
  const dispatch = useAppDispatch();

  return {
    updateQuantity: (id: number, qty: number) =>
      dispatch(updateCartItemQuantity({ productId: id, quantity: qty })),
    removeProduct: (id: number) => dispatch(removeCartItem(id)),
    clear: () => dispatch(clearCart()),
  };
}
