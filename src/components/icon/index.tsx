import type { ComponentProps, FC } from "react";
import { iconVariants, type iconVariantsProps } from "./icon.variants";

interface IconProps extends ComponentProps<"svg">, iconVariantsProps {
  svg: FC<ComponentProps<"svg">>;
}

export default function Icon({
  className,
  animate,
  svg: SvgComponent,
  ...props
}: IconProps) {
  return (
    <SvgComponent className={iconVariants({ className, animate })} {...props} />
  );
}
