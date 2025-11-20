import { tv, type VariantProps } from "tailwind-variants";

export const sidebarContainerVariants = tv({
  base: "h-screen w-full bg-background shadow-lg fixed top-0 right-0 z-60 transition",
  variants: {
    size: {
      md: "md:w-72",
    },
    openRightDirection: {
      true: "translate-x-0",
      false: "translate-x-full",
    },
  },
  defaultVariants: {
    size: "md",
    openRightDirection: false,
  },
});

export const sidebarOverlayVariants = tv({
  base: "h-screen w-full bg-black/45 backdrop-blur-xs shadow-lg fixed top-0 right-0 z-55 transition",
  variants: {
    isOpen: {
      true: "opacity-100 pointer-events-auto",
      false: "opacity-0 pointer-events-none",
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});

export type SidebarOverlayVariantsProps = VariantProps<
  typeof sidebarOverlayVariants
>;

export type SidebarContainerVariantsProps = VariantProps<
  typeof sidebarContainerVariants
>;
