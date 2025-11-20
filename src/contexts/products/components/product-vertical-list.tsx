import ButtonIcon from "../../../components/button-icon";
import InputText from "../../../components/input-text";
import Text from "../../../components/text";
import type { ShoppingCartItem } from "../../../store/slices/shopping-cart";

import TrashIcon from "../../../assets/icons/Trash.svg?react";

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
      {products.map((product) => (
        <div className="flex gap-4" key={`product-vertical-list-${product.id}`}>
          <img className="h-20" src={product.image} alt={product.title} />
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
                <div className="max-w-20">
                  <InputText
                    size="sm"
                    type="number"
                    onChange={(element) =>
                      handleQuantityChange(
                        product.id,
                        parseInt(element.target.value),
                      )
                    }
                    defaultValue={product.quantity}
                  />
                </div>

                <ButtonIcon
                  onClick={() => handleRemoveProduct(product.id)}
                  variant="danger"
                  size="sm"
                  svg={TrashIcon}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
