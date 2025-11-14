import { tv, type VariantProps } from "tailwind-variants";

export const buttonIconVariants = tv({
  base: "flex items-center justify-center cursor-pointer rounded-lg transition",
  variants: {
    variant: {
      primary: "bg-primary hover:bg-primary/60",
      ghost: "bg-transparent hover:bg-primary/15",
    },
    disabled: {
      true: "pointer-events-none opacity-50",
    },
    handling: {
      true: "pointer-events-none opacity-50",
    },
    size: {
      md: "w-12 h-12",
      sm: "w-8 h-8",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    disabled: false,
    handling: false,
  },
});

export const buttonIconIconVariants = tv({
  variants: {
    variant: {
      primary: "fill-white",
      ghost: "fill-primary",
    },
    size: {
      md: "w-6 h-6",
      sm: "w-4 h-4",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

export type buttonIconVariantsProps = VariantProps<typeof buttonIconVariants>;
