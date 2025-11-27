import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import CartButton from "./index";
import { cartButtonQuantityBadgeWrapperVariants } from "./cart-button.variants";

describe("CartButton component", () => {
  it("should render correctly", () => {
    render(<CartButton />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should not display the quantity badge when quantity is 0", () => {
    render(<CartButton quantity={0} />);
    const badge = screen.getByText("0").parentElement;
    const expectedClasses = cartButtonQuantityBadgeWrapperVariants({
      hidden: true,
    });
    expect(badge).toHaveClass(expectedClasses);
  });

  it("should not display the quantity badge when quantity is undefined", () => {
    render(<CartButton />);

    const icon = screen.getByRole("button").querySelector("svg");
    const badge = icon?.nextElementSibling;
    const expectedClasses = cartButtonQuantityBadgeWrapperVariants({
      hidden: true,
    });
    expect(badge).toHaveClass(expectedClasses);
  });

  it("should display the quantity badge with the correct number when quantity is greater than 0", () => {
    render(<CartButton quantity={5} />);
    const badge = screen.getByText("5").parentElement;
    const expectedClasses = cartButtonQuantityBadgeWrapperVariants({
      hidden: false,
    });

    expect(badge).toHaveClass(expectedClasses);
    expect(badge).toBeInTheDocument();
  });

  it("should have the correct aria-label for a single item", () => {
    render(<CartButton quantity={1} />);
    const button = screen.getByRole("button", {
      name: "Carrinho de compras com 1 item",
    });
    expect(button).toBeInTheDocument();
  });

  it("should have the correct aria-label for multiple items", () => {
    render(<CartButton quantity={3} />);
    const button = screen.getByRole("button", {
      name: "Carrinho de compras com 3 items",
    });
    expect(button).toBeInTheDocument();
  });

  it("should call onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClickMock = vi.fn();
    render(<CartButton onClick={onClickMock} />);
    const buttonElement = screen.getByRole("button");

    await user.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should not call the onClick function when the button is disabled", async () => {
    const user = userEvent.setup();
    const onClickMock = vi.fn();
    render(<CartButton onClick={onClickMock} disabled />);
    const buttonElement = screen.getByRole("button");

    await user.click(buttonElement);
    expect(onClickMock).not.toHaveBeenCalled();
  });
});
