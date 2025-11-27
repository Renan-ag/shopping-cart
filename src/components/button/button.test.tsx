import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Button from "./index";
import { buttonVariants } from "./button.variants";

describe("Button component", () => {
  it("should render the button with the children content", () => {
    render(<Button>Click me</Button>);

    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("should call the onClick function when the user clicks on the button", async () => {
    const user = userEvent.setup();
    const onClickMock = vi.fn();

    render(<Button onClick={onClickMock}>Click me</Button>);

    const buttonElement = screen.getByRole("button", { name: /click me/i });
    await user.click(buttonElement);

    expect(onClickMock).toHaveBeenCalled();
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should apply the correct variant classes", () => {
    render(<Button variant="primary">Click me</Button>);

    const buttonElement = screen.getByRole("button", { name: /click me/i });
    const expectedClass = buttonVariants({ variant: "primary" });
    expect(buttonElement).toHaveClass(expectedClass);
  });

  it("should apply the correct size classes", () => {
    render(<Button size="sm">Click me</Button>);

    const buttonElement = screen.getByRole("button", { name: /click me/i });
    const expectedClass = buttonVariants({ size: "sm" });
    expect(buttonElement).toHaveClass(expectedClass);
  });

  it("should apply custom class", () => {
    render(<Button className="custom-class">Click me</Button>);

    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toHaveClass("custom-class");
  });

  it("should not call the onClick function when the button is disabled", async () => {
    const user = userEvent.setup();
    const onClickMock = vi.fn();

    render(
      <Button disabled onClick={onClickMock}>
        Click me
      </Button>,
    );

    const buttonElement = screen.getByRole("button");
    await user.click(buttonElement);

    expect(onClickMock).not.toHaveBeenCalled();
    expect(onClickMock).toHaveBeenCalledTimes(0);
    expect(buttonElement).toBeDisabled();
  });
});
