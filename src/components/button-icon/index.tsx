import type { ComponentProps, FC } from "react";
import Icon from "../icon";
import {
  buttonIconIconVariants,
  buttonIconVariants,
  type buttonIconVariantsProps,
} from "./button-icon.variants";
import SpinnerIcon from "../../assets/icons/Spinner.svg?react";

interface ButtonIconProps
  extends Omit<ComponentProps<"button">, "disabled" | "size">,
    buttonIconVariantsProps {
  svg: FC<ComponentProps<"svg">>;
}

export default function ButtonIcon({
  svg,
  disabled,
  handling,
  className,
  variant,
  size,
  ...props
}: ButtonIconProps) {
  return (
    <button
      className={buttonIconVariants({
        className,
        disabled,
        handling,
        variant,
        size,
      })}
      {...props}
    >
      <Icon
        className={buttonIconIconVariants({ variant, size })}
        svg={handling ? SpinnerIcon : svg}
        animate={handling}
      />
    </button>
  );
}
