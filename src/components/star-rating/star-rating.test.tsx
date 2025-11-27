import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import StarRating from "./index";

// Mocking the StarIcon to add test-ids based on its classes
vi.mock("../../assets/icons/Star.svg?react", () => ({
  default: ({ className }: { className: string }) => {
    let testId = "star-icon";
    if (className.includes("text-gray-300")) {
      testId = "star-empty";
    } else if (className.includes("text-yellow-400")) {
      if (className.includes("mask-half-star")) {
        testId = "star-half";
      } else {
        testId = "star-full";
      }
    }
    return <svg data-testid={testId} className={className} />;
  },
}));

describe("Star rating component", () => {
  it("should render the correct text and aria-label", () => {
    render(<StarRating rating={4} totalStars={5} />);
    expect(screen.getByText("(4/5)")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Avaliação de 4 de 5 estrelas"),
    ).toBeInTheDocument();
  });

  it("should render the correct number of empty stars", () => {
    render(<StarRating rating={3} totalStars={5} />);

    const emptyStars = screen.getAllByTestId("star-empty");
    expect(emptyStars).toHaveLength(5);
  });

  it("should render the correct number of full stars", () => {
    render(<StarRating rating={4} totalStars={5} />);
    const fullStars = screen.getAllByTestId("star-full");
    expect(fullStars).toHaveLength(4);

    expect(screen.queryByTestId("star-half")).not.toBeInTheDocument();
  });

  it("should render the correct number of full and half stars", () => {
    render(<StarRating rating={3.5} totalStars={5} />);
    const fullStars = screen.getAllByTestId("star-full");
    const halfStars = screen.getAllByTestId("star-half");

    expect(fullStars).toHaveLength(3);
    expect(halfStars).toHaveLength(1);
  });

  it("should render no filled stars for a rating of 0", () => {
    render(<StarRating rating={0} totalStars={5} />);
    expect(screen.queryByTestId("star-full")).not.toBeInTheDocument();
    expect(screen.queryByTestId("star-half")).not.toBeInTheDocument();
  });

  it("should render all full stars for a perfect rating", () => {
    render(<StarRating rating={5} totalStars={5} />);
    const fullStars = screen.getAllByTestId("star-full");
    expect(fullStars).toHaveLength(5);
    expect(screen.queryByTestId("star-half")).not.toBeInTheDocument();
  });
});
