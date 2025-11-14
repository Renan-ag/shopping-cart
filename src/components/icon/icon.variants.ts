import { tv, type VariantProps } from "tailwind-variants";

export const iconVariants = tv({
  variants: {
    animate: {
      false: "",
      true: "animate-spin",
    },
  },
  defaultVariants: {
    animate: false,
  },
});

export type iconVariantsProps = VariantProps<typeof iconVariants>;
