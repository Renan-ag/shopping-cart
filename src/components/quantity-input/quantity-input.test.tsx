import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import QuantityInput from "./index";

vi.mock("../../assets/icons/MinusCircle.svg?react", () => ({
  default: () => <svg data-testid="minus-icon" />,
}));
vi.mock("../../assets/icons/PlusCircle.svg?react", () => ({
  default: () => <svg data-testid="plus-icon" />,
}));
vi.mock("../../assets/icons/Trash.svg?react", () => ({
  default: () => <svg data-testid="trash-icon" />,
}));

describe("Quantity input component", () => {
  it("should render the initial quantity", () => {
    render(
      <QuantityInput quantity={5} onChange={() => {}} onRemove={() => {}} />,
    );
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should call onChange with an increased value when the plus button is clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <QuantityInput
        quantity={5}
        onChange={handleChange}
        onRemove={() => {}}
      />,
    );

    const plusButton = screen.getAllByRole("button")[1];
    await user.click(plusButton);

    expect(handleChange).toHaveBeenCalledWith(6);
  });

  it("should call onChange with a decreased value when the minus button is clicked and quantity more than 1", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <QuantityInput
        quantity={5}
        onChange={handleChange}
        onRemove={() => {}}
      />,
    );

    // The minus button is the first button
    const minusButton = screen.getAllByRole("button")[0];
    await user.click(minusButton);

    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it("should show the trash icon and call onRemove when quantity is 1 and the button is clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const handleRemove = vi.fn();
    render(
      <QuantityInput
        quantity={1}
        onChange={handleChange}
        onRemove={handleRemove}
      />,
    );

    // Check if the trash icon is rendered
    expect(screen.getByTestId("trash-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("minus-icon")).not.toBeInTheDocument();

    const removeButton = screen.getAllByRole("button")[0];
    await user.click(removeButton);

    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
