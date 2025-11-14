import { tv } from "tailwind-variants";

export const starRatingWrapperVariants = tv({
  base: "flex items-start justify-between gap-0.5",
});

export const starIconIconVariants = tv({
  variants: {
    variant: {
      filled: "text-yellow-400 fill-yellow-400 absolute top-0 left-0",
      empty: " text-gray-300 fill-gray-300",
    },
    size: {
      sm: "w-4.5 h-auto",
    },
    isHalf: {
      true: "mask-half-star",
      false: "",
    },
  },
  defaultVariants: {
    variant: "filled",
    size: "sm",
    isHalf: false,
  },
});
