import { useState, useEffect } from "react";
import Text from "../text";
import CartButton from "../cart-button";
import Container from "../container";
import { useAppDispatch, useAppSelector } from "../../store";
import { handleSidebar } from "../../store/slices/sidebar";

export default function MainHeader() {
  const dispatch = useAppDispatch();
  const shoppingCart = useAppSelector((state) => state.shoppingCart);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          border-b border-solid border-gray-300
          ${
            scrolled
              ? "bg-background/90 backdrop-blur-sm shadow-lg h-16"
              : "h-16"
          }
        `}
      >
        <Container className="flex items-center justify-between h-full px-4 py-2">
          <Text as="h1" variant="heading-medium">
            Shopping Cart
          </Text>

          <div>
            <CartButton
              variant="ghost"
              quantity={shoppingCart.totalQuantity}
              onClick={() => {
                dispatch(handleSidebar("open"));
              }}
            />
          </div>
        </Container>
      </header>

      {/* Espaço para compensar o header fixo */}
      <div className="h-16" />
    </>
  );
}
