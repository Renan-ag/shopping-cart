import Button from "../../../components/button";
import ButtonIcon from "../../../components/button-icon";
import Text from "../../../components/text";
import ProductVerticalList from "../../products/components/product-vertical-list";

import XCircleIcon from "../../../assets/icons/XCircle.svg?react";
import { useAppSelector } from "../../../store";
import { toast } from "sonner";
import { useShoppingCartActions } from "../hooks/useShoppingCartActions";

interface ShoppingCartSidebarContentProps {
  closeSidebar: () => void;
}

export const ShoppingCartSidebarContent = ({
  closeSidebar,
}: ShoppingCartSidebarContentProps) => {
  const { clear, removeProduct, updateQuantity } = useShoppingCartActions();
  const shoppingCartState = useAppSelector((state) => state.shoppingCart);

  const handleSimulateFinishPurchase = () => {
    closeSidebar();
    clear();
    toast.success("Purchase completed!");
  };

  return (
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
          aria-label="Close Shopping Cart Sidebar"
          variant="ghost"
        />
      </header>

      <main className="flex-1 mt-6 flex flex-col gap-6 overflow-y-auto">
        <ProductVerticalList
          products={shoppingCartState.items}
          handleQuantityChange={updateQuantity}
          handleRemoveProduct={removeProduct}
        />
      </main>

      <footer className="flex flex-col items-center mt-6">
        <Text variant="label-medium" as="h2" className="text-title-color mb-1">
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
  );
};
