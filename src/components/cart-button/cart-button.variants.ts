import { tv } from "tailwind-variants";

export const cartButtonQuantityBadgeWrapperVariants = tv({
  base: `
    flex items-center justify-center absolute bottom-1 right-0
    w-5.5 h-5 pt-px rounded-full bg-primary/90
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
