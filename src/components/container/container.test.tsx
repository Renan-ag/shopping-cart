import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Container from ".";

describe("Container component", () => {
  it("should render children", () => {
    render(<Container>Test</Container>);
    const textElement = screen.getByText("Test");
    expect(textElement).toBeInTheDocument();
  });

  it("should render as a header when 'as' prop is 'header'", () => {
    render(<Container as="header">Test</Container>);
    const containerElement = screen.getByRole("banner");
    expect(containerElement).toBeInTheDocument();
  });

  it("should apply the custom className", () => {
    render(<Container className="custom-class">Test</Container>);
    const textElement = screen.getByText(/hello world/i);
    expect(textElement).toHaveClass("custom-class");
  });
});
