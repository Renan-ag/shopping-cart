import { type ComponentProps } from "react";
import {
  sidebarContainerVariants,
  sidebarOverlayVariants,
  type SidebarContainerVariantsProps,
  type SidebarOverlayVariantsProps,
} from "./sidebar.variants";

interface SidebarOverlayProps extends SidebarOverlayVariantsProps {
  isOpen: boolean;
  onClick?: () => void;
}

function SidebarOverlay({ isOpen, onClick }: SidebarOverlayProps) {
  return (
    <div onClick={onClick} className={sidebarOverlayVariants({ isOpen })}></div>
  );
}

interface SidebarContainerProps
  extends ComponentProps<"div">,
    SidebarContainerVariantsProps {
  isOpen: boolean;
}

function SidebarContainer({
  children,
  isOpen,
  ...props
}: SidebarContainerProps) {
  return (
    <div
      className={sidebarContainerVariants({ openRightDirection: isOpen })}
      {...props}
    >
      {children}
    </div>
  );
}

interface SidebarProps {
  children: React.ReactNode;
  isOpen: boolean;
  handleOverlayClickEvent?: () => void;
}

export default function Sidebar({
  children,
  isOpen,
  handleOverlayClickEvent,
}: SidebarProps) {
  return (
    <>
      <SidebarOverlay onClick={handleOverlayClickEvent} isOpen={isOpen} />
      <SidebarContainer isOpen={isOpen}>{children}</SidebarContainer>
    </>
  );
}
