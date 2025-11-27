import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ButtonIcon from "./index";
import { buttonIconVariants } from "./button-icon.variants";
import type { ComponentProps, FC } from "react";

const MockIcon: FC<ComponentProps<"svg">> = (props) => (
  <svg data-testid="mock-svg" {...props}>
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
);

describe("Button Icon component", () => {
  it("should render the button with the svg icon", () => {
    render(<ButtonIcon svg={MockIcon} />);

    const buttonElement = screen.getByRole("button");
    const iconElement = screen.getByTestId("mock-svg");

    expect(buttonElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });

  it("should call the onClick function when the user clicks on the button", async () => {
    const user = userEvent.setup();
    const onClickMock = vi.fn();

    render(<ButtonIcon svg={MockIcon} onClick={onClickMock} />);

    const buttonElement = screen.getByRole("button");
    await user.click(buttonElement);

    expect(onClickMock).toHaveBeenCalled();
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should not call the onClick function when the button is disabled", async () => {
    const user = userEvent.setup();
    const onClickMock = vi.fn();

    render(<ButtonIcon svg={MockIcon} onClick={onClickMock} disabled />);

    const buttonElement = screen.getByRole("button");
    await user.click(buttonElement);

    expect(onClickMock).not.toHaveBeenCalled();
    expect(onClickMock).toHaveBeenCalledTimes(0);
    expect(buttonElement).toBeDisabled();
  });

  it("should apply the correct variant classes", () => {
    render(<ButtonIcon svg={MockIcon} variant="primary" />);

    const buttonElement = screen.getByRole("button");
    const expectedClasses = buttonIconVariants({ variant: "primary" });
    expect(buttonElement).toHaveClass(expectedClasses);
  });

  it("should apply the correct size classes", () => {
    render(<ButtonIcon svg={MockIcon} size="sm" />);

    const buttonElement = screen.getByRole("button");
    const expectedClasses = buttonIconVariants({ size: "sm" });
    expect(buttonElement).toHaveClass(expectedClasses);
  });

  it("should apply custom class", () => {
    render(<ButtonIcon svg={MockIcon} className="custom-class" />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("custom-class");
  });
});
