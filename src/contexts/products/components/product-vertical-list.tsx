import Text from "../../../components/text";
import type { ShoppingCartItem } from "../../../store/slices/shopping-cart";

import QuantityInput from "../../../components/quantity-input";

interface ProductVerticalListProps {
  products: ShoppingCartItem[];
  handleQuantityChange: (productId: number, quantity: number) => void;
  handleRemoveProduct: (productId: number) => void;
}

export default function ProductVerticalList({
  products,
  handleQuantityChange,
  handleRemoveProduct,
}: ProductVerticalListProps) {
  return (
    <>
      {products.map((product, index) => (
        <div
          className={`flex gap-4 ${index !== products.length - 1 ? "border-b" : ""} py-2 border-solid border-primary/20`}
          key={`product-vertical-list-${product.id}`}
        >
          <img
            className="w-20 h-20 object-contain"
            src={product.image}
            alt={product.title}
          />
          <div className="flex-1">
            <Text
              as="h3"
              title={product.title}
              variant="label-small"
              className="text-title-color line-clamp-2"
            >
              {product.title}
            </Text>
            <div>
              <Text as="span" variant="paragraph-small" className="font-bold">
                {(product.price * product.quantity).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Text>

              <div className="flex justify-end gap-2 mt-2">
                <QuantityInput
                  quantity={product.quantity}
                  onChange={(quantity) =>
                    handleQuantityChange(product.id, quantity)
                  }
                  onRemove={() => handleRemoveProduct(product.id)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {products.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <Text as="p" variant="paragraph-medium" className="text-center">
            Your shopping cart is empty.
          </Text>
        </div>
      )}
    </>
  );
}
