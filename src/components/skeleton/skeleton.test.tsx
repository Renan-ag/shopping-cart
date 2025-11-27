import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Skeleton from "./index";

describe("Skeleton component", () => {
  it("should render correctly", () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const customClass = "h-10 w-full";
    render(<Skeleton data-testid="skeleton" className={customClass} />);
    const skeletonElement = screen.getByTestId("skeleton");
    expect(skeletonElement).toHaveClass(customClass);
  });

  it('should apply the "rounded-full" class when rounded prop is "full"', () => {
    render(<Skeleton data-testid="skeleton" rounded="full" />);
    const skeletonElement = screen.getByTestId("skeleton");
    expect(skeletonElement).toHaveClass("rounded-full");
  });

  it("should have the pulse animation class", () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeletonElement = screen.getByTestId("skeleton");
    expect(skeletonElement).toHaveClass("animate-pulse");
  });
});
