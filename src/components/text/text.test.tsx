import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Text from "./index";
import { textVariants } from "./text.variants";

describe("Text component", () => {
  it("should render the text with the children content", () => {
    render(<Text>Hello World</Text>);

    const textElement = screen.getByText(/hello world/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render as a p tag when 'as' prop is p", () => {
    render(<Text as="p">Hello World</Text>);

    const textElement = screen.getByText(/hello world/i);
    expect(textElement.tagName).toBe("P");
  });

  it("should apply the correct variant class", () => {
    render(<Text variant="paragraph-large">Hello World</Text>);

    const textElement = screen.getByText(/hello world/i);
    const expectedClass = textVariants({ variant: "paragraph-large" });

    expect(textElement).toHaveClass(expectedClass);
  });

  it("should apply the custom className", () => {
    render(<Text className="custom-class">Hello World</Text>);
    const textElement = screen.getByText(/hello world/i);
    expect(textElement).toHaveClass("custom-class");
  });

  it("should apply title property", () => {
    render(<Text title="Hello World">Hello World</Text>);
    const textElement = screen.getByText(/hello world/i);
    expect(textElement).toHaveAttribute("title", "Hello World");
  });
});
