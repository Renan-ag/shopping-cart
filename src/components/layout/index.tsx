import ProductVerticalList from "../../contexts/products/components/product-vertical-list";
import { useAppDispatch, useAppSelector } from "../../store";
import { handleSidebar } from "../../store/slices/sidebar";
import Sidebar from "../sidebar";
import Text from "../text";

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

  return (
    <div>
      <Sidebar
        handleOverlayClickEvent={closeSidebar}
        isOpen={sidebarState.isOpenSidebar}
      >
        <div className="py-4 px-2">
          <Text variant="heading-medium" as="h2">
            Shopping Cart
          </Text>
          <div className="mt-6">
            <ProductVerticalList products={shoppingCartState.items} />
          </div>
        </div>
      </Sidebar>
      {children}
    </div>
  );
}
