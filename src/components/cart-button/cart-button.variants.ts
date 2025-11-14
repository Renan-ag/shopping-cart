import { tv } from "tailwind-variants";

export const cartButtonQuantityBadgeWrapperVariants = tv({
  base: `
    flex items-center justify-center absolute bottom-1 right-0
    w-5.5 h-5 pt-0.5 rounded-full bg-primary/90
  `,
  variants: {
    hidden: {
      true: "opacity-0",
    },
  },
  defaultVariants: {
    hidden: false,
  },
});
