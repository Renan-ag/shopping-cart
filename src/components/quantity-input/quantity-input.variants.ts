import { tv } from "tailwind-variants";

export const quantityButtonVariants = tv({
  base: "flex items-center justify-center cursor-pointer transition-colors",
  variants: {
    variant: {
      primary: "bg-primary hover:bg-primary/85 text-white",
      danger: "bg-red-600 hover:bg-red-500 text-white",
    },
    position: {
      left: "rounded-tl-full rounded-bl-full",
      right: "rounded-tr-full rounded-br-full",
    },
    size: {
      md: "h-8 w-8",
    },
  },
  defaultVariants: {
    position: "left",
    variant: "primary",
    size: "md",
  },
});

export const quantityButtonIconVariants = tv({
  variants: {
    variant: {
      primary: "fill-white",
      danger: "fill-white",
    },
    size: {
      md: "h-5 w-5",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export const quantityButtonContainerVariants = tv({
  base: "flex items-center gap-2 border boder-solid border-primary/50 rounded-full p-0 bg-slate-200",
});
