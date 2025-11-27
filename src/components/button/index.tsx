import Text from "../text";
import type { ComponentProps } from "react";
import {
  buttonTextVariants,
  buttonVariants,
  type buttonVariantsProps,
} from "./button.variants";

interface ButtonProps extends ComponentProps<"button">, buttonVariantsProps {
  handling?: boolean;
}

export default function Button({
  children,
  type = "button",
  disabled,
  className,
  variant,
  size,
  handling,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({
        className,
        handling,
        size,
        variant,
        disabled,
      })}
      disabled={disabled}
      type={type}
      {...props}
    >
      <Text
        variant="label-medium"
        className={buttonTextVariants({ size, variant })}
      >
        {children}
      </Text>
    </button>
  );
}
