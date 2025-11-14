import { tv, type VariantProps } from "tailwind-variants";

export const inputTextContainerVariants = tv({
  base: "flex flex-col gap-2",
});

export const inputTextWrapperVariants = tv({
  base: `
    border border-solid border-gray-300 rounded-lg bg-transparent
    focus-within:border-primary flex items-center transition
  `,
  variants: {
    size: {
      md: "h-12 p-4",
    },
    disabled: {
      true: "pointer-events-none opacity-70",
    },
  },
  defaultVariants: {
    disabled: false,
    size: "md",
  },
});

export const inputTextVariants = tv({
  base: "outline-none bg-transparent placeholder:text-gray-200 text-gray-100 font-sans flex-1",
});

export type inputTextWrapperVariantsProps = VariantProps<
  typeof inputTextWrapperVariants
>;
