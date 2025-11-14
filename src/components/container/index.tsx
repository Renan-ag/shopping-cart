import { createElement, type ComponentProps, type JSX } from "react";
import {
  containerVariants,
  type containerVariantsProps,
} from "./container.variants";

interface ContainerProps extends containerVariantsProps, ComponentProps<"div"> {
  as?: keyof JSX.IntrinsicElements;
}

export default function Container({
  as = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  return createElement(
    as,
    {
      className: containerVariants({ className }),
      ...props,
    },
    children,
  );
}
