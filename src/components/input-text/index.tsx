import type { ComponentProps, ReactNode } from "react";
import {
  inputTextContainerVariants,
  inputTextVariants,
  inputTextWrapperVariants,
  type inputTextWrapperVariantsProps,
} from "./input-text.variants";
import Text from "../text";

interface InputTextProps
  extends Omit<ComponentProps<"input">, "disabled" | "size">,
    inputTextWrapperVariantsProps {
  error?: ReactNode;
}

export default function InputText({
  className,
  disabled,
  size,
  error,
  ...props
}: InputTextProps) {
  return (
    <div className={inputTextContainerVariants({ className })}>
      <div className={inputTextWrapperVariants({ disabled, size })}>
        <input className={inputTextVariants()} disabled={disabled} {...props} />
      </div>
      {error && (
        <Text variant="label-small" className="text-danger">
          {error}
        </Text>
      )}
    </div>
  );
}
