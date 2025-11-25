import ProductVerticalList from "../../contexts/products/components/product-vertical-list";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  clearCart,
  removeCartItem,
  updateCartItemQuantity,
} from "../../store/slices/shopping-cart";
import { handleSidebar } from "../../store/slices/sidebar";
import Button from "../button";
import Sidebar from "../sidebar";
import Text from "../text";
import XCircleIcon from "../../assets/icons/XCircle.svg?react";
import ButtonIcon from "../button-icon";
import { toast } from "sonner";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const dispatch = useAppDispatch();
  const sidebarState = useAppSelector((state) => state.sidebar);
  const shoppingCartState = useAppSelector((state) => state.shoppingCart);

  const closeSidebar = () => {
    dispatch(handleSidebar("close"));
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    dispatch(updateCartItemQuantity({ productId, quantity }));
  };

  const handleRemoveProduct = (productId: number) => {
    dispatch(removeCartItem(productId));
  };

  const handleSimulateFinishPurchase = () => {
    dispatch(handleSidebar("close"));
    dispatch(clearCart());
    toast.success("Purchase completed!");
  };

  return (
    <div>
      <Sidebar
        handleOverlayClickEvent={closeSidebar}
        isOpen={sidebarState.isOpenSidebar}
      >
        <div className="py-4 px-2 flex flex-col h-full">
          <header className="flex justify-between items-center">
            <Text variant="heading-medium" as="h2">
              Shopping Cart
            </Text>

            <ButtonIcon
              svg={XCircleIcon}
              onClick={closeSidebar}
              size="sm"
              className="ml-2"
              variant="ghost"
            />
          </header>

          <main className="flex-1 mt-6 flex flex-col gap-6 overflow-y-auto">
            <ProductVerticalList
              products={shoppingCartState.items}
              handleQuantityChange={handleQuantityChange}
              handleRemoveProduct={handleRemoveProduct}
            />
          </main>

          <footer className="flex flex-col items-center mt-6">
            <Text
              variant="label-medium"
              as="h2"
              className="text-title-color mb-1"
            >
              Total: ${shoppingCartState.totalPrice.toFixed(2)}
            </Text>

            <Button
              onClick={handleSimulateFinishPurchase}
              disabled={shoppingCartState.items.length === 0}
              size="sm"
              className="w-full"
              variant="primary"
            >
              Finish purchase
            </Button>
          </footer>
        </div>
      </Sidebar>
      {children}
    </div>
  );
}
