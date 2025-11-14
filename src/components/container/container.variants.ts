import { tv, type VariantProps } from "tailwind-variants";

export const containerVariants = tv({
  base: "mx-auto",
  variants: {
    size: {
      md: "max-w-296 px-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type containerVariantsProps = VariantProps<typeof containerVariants>;
