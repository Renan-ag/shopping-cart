import { createElement } from "react";
import { textVariants, type textVariantsProps } from "./text.variants";

interface TextProps extends textVariantsProps {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
  title?: string;
}

export default function Text({
  as = "span",
  variant,
  className,
  children,
  ...props
}: TextProps) {
  return createElement(
    as,
    {
      className: textVariants({ variant, className }),
      ...props,
    },
    children,
  );
}
