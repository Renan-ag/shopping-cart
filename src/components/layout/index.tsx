import { useAppDispatch, useAppSelector } from "../../store";
import { handleSidebar } from "../../store/slices/sidebar";
import Sidebar from "../sidebar";
import { ShoppingCartSidebarContent } from "../../contexts/shopping-cart/components/shopping-cart-sidebar-content";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const dispatch = useAppDispatch();
  const sidebarState = useAppSelector((state) => state.sidebar);

  const closeSidebar = () => {
    dispatch(handleSidebar("close"));
  };

  return (
    <div>
      <Sidebar
        handleOverlayClickEvent={closeSidebar}
        isOpen={sidebarState.isOpen}
      >
        <ShoppingCartSidebarContent closeSidebar={closeSidebar} />
      </Sidebar>
      {children}
    </div>
  );
}
