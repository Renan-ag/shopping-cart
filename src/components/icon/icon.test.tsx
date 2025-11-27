import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import type { ComponentProps, FC } from "react";
import Icon from "./index";

const MockIcon: FC<ComponentProps<"svg">> = (props) => (
  <svg data-testid="mock-svg" {...props}>
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
);

describe("Icon component", () => {
  it("should render the provided SVG component", () => {
    render(<Icon svg={MockIcon} />);

    const svgElement = screen.getByTestId("mock-svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("should apply the className prop to the SVG", () => {
    const customClass = "text-red-500";
    render(<Icon svg={MockIcon} className={customClass} />);

    const svgElement = screen.getByTestId("mock-svg");
    expect(svgElement).toHaveClass(customClass);
  });

  it("should apply the spin animation class when animate is true", () => {
    render(<Icon svg={MockIcon} animate />);

    const svgElement = screen.getByTestId("mock-svg");
    expect(svgElement).toHaveClass("animate-spin");
  });

  it("should not apply the spin animation class when animate is false or not provided", () => {
    const { rerender } = render(<Icon svg={MockIcon} />);
    const svgElement = screen.getByTestId("mock-svg");
    expect(svgElement).not.toHaveClass("animate-spin");

    rerender(<Icon svg={MockIcon} animate={false} />);
    expect(svgElement).not.toHaveClass("animate-spin");
  });

  it("should pass through other props to the SVG component", () => {
    const label = "A mock icon";

    render(<Icon svg={MockIcon} aria-label={label} />);

    const svgElement = screen.getByLabelText(label);
    expect(svgElement).toBeInTheDocument();
  });
});
