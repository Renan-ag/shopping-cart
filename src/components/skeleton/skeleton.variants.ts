import { tv, type VariantProps } from "tailwind-variants";

export const skeletonVariants = tv({
  base: "animate-pulse bg-gray-300 pointer-events-none",
  variants: {
    rounded: {
      sm: "rounded-sm",
      lg: "rounded-lg",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    rounded: "lg",
  },
});

export type SkeletonVariantsProps = VariantProps<typeof skeletonVariants>;
