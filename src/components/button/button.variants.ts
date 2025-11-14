import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: "cursor-pointer rounded-md transition",
  variants: {
    variant: {
      primary: "bg-primary hover:bg-primary/60",
      ghost: "bg-transparent hover:bg-primary/15",
    },
    size: {
      md: "px-5 h-12",
      sm: "px-2 h-9",
    },
    disabled: {
      true: "pointer-events-none opacity-50",
    },
    handling: {
      true: "pointer-events-none opacity-50",
    },
  },
  defaultVariants: {
    disabled: false,
    handling: false,
    size: "md",
    variant: "primary",
  },
});

export const buttonTextVariants = tv({
  variants: {
    variant: {
      primary: "text-white",
      ghost: "text-primary",
    },
    size: {
      md: "text-base",
      sm: "text-sm",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type buttonVariantsProps = VariantProps<typeof buttonVariants>;
