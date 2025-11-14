import { tv, type VariantProps } from "tailwind-variants";

export const textVariants = tv({
  base: "font-sans text-paragraph-color",
  variants: {
    variant: {
      "heading-large": "text-2xl leading-[130%] font-bold text-title-color",
      "heading-medium": "text-xl leading-[130%] font-bold text-title-color",
      "paragraph-large": "text-base leading-[150%] font-normal",
      "paragraph-medium": "text-sm leading-[150%] font-normal",
      "paragraph-small": "text-xs leading-[150%] font-medium",
      "label-medium": "text-base leading-[150%] font-semibold",
      "label-small": "text-sm leading-[150%] font-semibold",
      "label-extra-small": "text-xs leading-[150%] font-semibold",
    },
  },
  defaultVariants: {
    variant: "paragraph-medium",
  },
});

export type textVariantsProps = VariantProps<typeof textVariants>;
