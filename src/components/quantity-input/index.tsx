import MinusCircleIcon from "../../assets/icons/MinusCircle.svg?react";
import PlusCircleIcon from "../../assets/icons/PlusCircle.svg?react";
import TrashIcon from "../../assets/icons/Trash.svg?react";
import Icon from "../icon";
import Text from "../text";
import {
  quantityButtonContainerVariants,
  quantityButtonIconVariants,
  quantityButtonVariants,
} from "./quantity-input.variants";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  onRemove: () => void;
}

export default function QuantityInput({
  quantity,
  onChange,
  onRemove,
}: QuantitySelectorProps) {
  const handleIncreaseQuantity = () => {
    const newQty = quantity + 1;
    onChange?.(newQty);
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      onChange?.(newQty);
    }
  };

  const handleRemoveItem = () => {
    onRemove?.();
  };

  return (
    <div className={quantityButtonContainerVariants()}>
      {quantity === 1 ? (
        <button
          className={quantityButtonVariants({ variant: "danger" })}
          onClick={handleRemoveItem}
        >
          <Icon
            className={quantityButtonIconVariants({ variant: "danger" })}
            svg={TrashIcon}
          />
        </button>
      ) : (
        <button
          className={quantityButtonVariants()}
          onClick={handleDecrementQuantity}
        >
          <Icon
            className={quantityButtonIconVariants()}
            svg={MinusCircleIcon}
          />
        </button>
      )}

      <Text
        as="span"
        variant="label-medium"
        className="min-w-6 text-title-color text-center"
      >
        {quantity}
      </Text>

      <button
        className={quantityButtonVariants({ position: "right" })}
        onClick={handleIncreaseQuantity}
      >
        <Icon className={quantityButtonIconVariants()} svg={PlusCircleIcon} />
      </button>
    </div>
  );
}
