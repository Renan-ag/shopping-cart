import Icon from "../icon";
import CartIcon from "./Cart.svg?react";
import {
  buttonIconVariants,
  type buttonIconVariantsProps,
} from "../button-icon/button-icon.variants";
import cx from "classnames";
import { useEffect, useRef, type ComponentProps } from "react";
import Text from "../text";
import { cartButtonQuantityBadgeWrapperVariants } from "./cart-button.variants";

interface CartButtonProps
  extends Omit<ComponentProps<"button">, "size" | "disabled">,
    buttonIconVariantsProps {
  quantity?: number;
}

export default function CartButton({
  className,
  variant,
  size,
  disabled,
  quantity,
  ...props
}: CartButtonProps) {
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const showQuantityBadge = quantity !== undefined && quantity > 0;

  useEffect(() => {
    const badge = badgeRef.current;
    if (!badge || !quantity || quantity <= 0) return;

    badge.classList.remove("animate-notify-pop");
    requestAnimationFrame(() => {
      badge.classList.add("animate-notify-pop");
    });
  }, [quantity]);

  return (
    <button
      type="button"
      aria-label={`Carrinho de compras ${quantity && quantity > 0 ? `com ${quantity} item${quantity > 1 ? "s" : ""}` : ""}`}
      className={cx(
        buttonIconVariants({ className, variant, size, disabled }),
        "relative",
      )}
      disabled={disabled}
      {...props}
    >
      <Icon className="w-7 h-7" svg={CartIcon} />
      <div
        ref={badgeRef}
        className={cartButtonQuantityBadgeWrapperVariants({
          hidden: !showQuantityBadge,
        })}
      >
        <Text
          as="span"
          variant="label-extra-small"
          className="leading-0 text-paragraph-light-color tracking-wider"
        >
          {quantity}
        </Text>
      </div>
    </button>
  );
}
