import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import Layout from "./index";
import { sidebar, handleSidebar } from "../../store/slices/sidebar";

vi.mock(
  "../../contexts/shopping-cart/components/shopping-cart-sidebar-content",
  () => ({
    ShoppingCartSidebarContent: ({
      closeSidebar,
    }: {
      closeSidebar: () => void;
    }) => (
      <div data-testid="sidebar-content">
        <button onClick={closeSidebar}>Mock Close</button>
        Sidebar Content Mock
      </div>
    ),
  }),
);

const renderWithProviders = (
  ui: React.ReactElement,
  { preloadedState = {}, ...renderOptions } = {},
) => {
  const store = configureStore({
    reducer: { sidebar },
    preloadedState,
  });

  vi.spyOn(store, "dispatch");

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

describe("Layout Component (isolated)", () => {
  it("should render children correctly", () => {
    renderWithProviders(
      <Layout>
        <div>Main Area</div>
      </Layout>,
      { preloadedState: { sidebar: { isOpen: false } } },
    );

    expect(screen.getByText("Main Area")).toBeInTheDocument();
  });

  it("should pass closeSidebar to the sidebar content mock", async () => {
    const { store } = renderWithProviders(
      <Layout>
        <div>Child Content</div>
      </Layout>,
      { preloadedState: { sidebar: { isOpen: true } } },
    );

    const mockCloseButton = screen.getByText("Mock Close");
    await userEvent.click(mockCloseButton);

    expect(store.dispatch).toHaveBeenCalledWith(handleSidebar("close"));
  });

  it("should render the Sidebar component structure", () => {
    renderWithProviders(
      <Layout>
        <div>Child</div>
      </Layout>,
      { preloadedState: { sidebar: { isOpen: true } } },
    );

    expect(screen.getByTestId("sidebar-content")).toBeInTheDocument();
    expect(screen.getByText("Sidebar Content Mock")).toBeInTheDocument();
  });
});
