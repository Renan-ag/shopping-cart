import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Sidebar from "./index";
import {
  sidebarContainerVariants,
  sidebarOverlayVariants,
} from "./sidebar.variants";

describe("Sidebar component", () => {
  it("should render children when open", () => {
    render(
      <Sidebar isOpen={true}>
        <div>Sidebar Content</div>
      </Sidebar>,
    );
    expect(screen.getByText("Sidebar Content")).toBeInTheDocument();
  });

  it("should be hidden by default (or when isOpen is false)", () => {
    render(
      <Sidebar isOpen={false}>
        <div>Sidebar Content</div>
      </Sidebar>,
    );

    const overlay =
      screen.getByText("Sidebar Content").parentElement?.previousElementSibling;
    const container = screen.getByText("Sidebar Content").parentElement;
    const expectedOverlayClass = sidebarOverlayVariants({ isOpen: false });
    const expectedContainerClass = sidebarContainerVariants({
      openRightDirection: false,
    });

    expect(overlay).toHaveClass(expectedOverlayClass);
    expect(container).toHaveClass(expectedContainerClass);
  });

  it("should be visible when isOpen is true", () => {
    render(
      <Sidebar isOpen={true}>
        <div>Sidebar Content</div>
      </Sidebar>,
    );

    const overlay =
      screen.getByText("Sidebar Content").parentElement?.previousElementSibling;
    const container = screen.getByText("Sidebar Content").parentElement;
    const expectedOverlayClass = sidebarOverlayVariants({ isOpen: true });
    const expectedContainerClass = sidebarContainerVariants({
      openRightDirection: true,
    });

    expect(overlay).toHaveClass(expectedOverlayClass);
    expect(container).toHaveClass(expectedContainerClass);
  });

  it("should call handleOverlayClickEvent when the overlay is clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Sidebar isOpen={true} handleOverlayClickEvent={handleClick}>
        <div>Sidebar Content</div>
      </Sidebar>,
    );

    const overlay =
      screen.getByText("Sidebar Content").parentElement?.previousElementSibling;
    expect(overlay).not.toBeNull();

    if (overlay) {
      await user.click(overlay);
      expect(handleClick).toHaveBeenCalledTimes(1);
    }
  });
});
