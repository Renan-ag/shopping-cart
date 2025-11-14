import Text from "../text";
import CartButton from "../cart-button";
// import { useState } from "react";
import Container from "../container";

export default function MainHeader() {
  // const [test, setTest] = useState(0);
  return (
    <header className="px-4 py-2 shadow-md">
      <Container className="flex items-center justify-between">
        <Text as="h1" variant="heading-large">
          Shopping Cart
        </Text>

        <div>
          <CartButton
            variant="ghost"
            quantity={0}
            onClick={() => {
              console.log("Cart icon click event.");
            }}
          />
          {/*<button onClick={() => setTest(test + 1)}>Add Item</button>*/}
        </div>
      </Container>
    </header>
  );
}
