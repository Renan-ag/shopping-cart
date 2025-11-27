import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import InputText from "./index";
import { inputTextWrapperVariants } from "./input-text.variants";

describe("Input text component", () => {
  it("should render with a placeholder", () => {
    const placeholderText = "Enter your name";
    render(<InputText placeholder={placeholderText} />);

    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });

  it("should call onChange when the user types", async () => {
    const user = userEvent.setup();
    const onChangeMock = vi.fn();
    render(<InputText onChange={onChangeMock} />);

    const inputElement = screen.getByRole("textbox");
    await user.type(inputElement, "hello");

    expect(onChangeMock).toHaveBeenCalledTimes(5);
  });

  it("should be a controlled component", () => {
    const { rerender } = render(<InputText value="Initial" />);
    let inputElement = screen.getByRole("textbox") as HTMLInputElement;
    expect(inputElement.value).toBe("Initial");

    rerender(<InputText value="Updated" />);
    inputElement = screen.getByRole("textbox") as HTMLInputElement;
    expect(inputElement.value).toBe("Updated");
  });

  it("should be disabled when the disabled prop is true", () => {
    render(<InputText disabled />);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeDisabled();

    const wrapper = inputElement.parentElement;
    const expectedClass = inputTextWrapperVariants({ disabled: true });
    expect(wrapper).toHaveClass(expectedClass);
  });

  it("should display an error message when the error prop is provided", () => {
    const errorMessage = "This field is required";
    render(<InputText error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should not display an error message when the error prop is not provided", () => {
    const errorMessage = "This field is required";
    render(<InputText />);

    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
  });
});
