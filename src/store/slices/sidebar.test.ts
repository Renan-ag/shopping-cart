// src/store/sidebar/sidebarSlice.test.ts
import { describe, it, expect } from "vitest";
import { sidebar, handleSidebar, type SidebarState } from "./sidebar";

describe("SidebarSlice", () => {
  const initialState: SidebarState = { isOpen: false };

  it("Should have correct initial state", () => {
    const state = sidebar(undefined, { type: "unknown" });
    expect(state).toEqual(initialState);
  });

  describe("handleSidebar", () => {
    it("Should open sidebar when payload is 'open'", () => {
      const state = sidebar(initialState, handleSidebar("open"));
      expect(state.isOpen).toBe(true);
    });

    it("Should close sidebar when payload is 'close'", () => {
      const openedState = sidebar(initialState, handleSidebar("open"));

      const state = sidebar(openedState, handleSidebar("close"));
      expect(state.isOpen).toBe(false);
    });

    it("Should toggle sidebar when no payload is provided", () => {
      const state = sidebar(initialState, handleSidebar());
      expect(state.isOpen).toBe(true);
    });

    it("should correctly handle 'open' when already open", () => {
      let state = sidebar(initialState, handleSidebar("open"));
      state = sidebar(state, handleSidebar("open"));
      expect(state.isOpen).toBe(true);
    });

    it("should correctly handle 'close' when already closed", () => {
      let state = sidebar(initialState, handleSidebar("close"));
      state = sidebar(state, handleSidebar("close"));
      expect(state.isOpen).toBe(false);
    });
  });

  it("Should work as a toggle button in real usage", () => {
    let state: SidebarState = initialState;

    state = sidebar(state, handleSidebar());
    expect(state.isOpen).toBe(true);

    state = sidebar(state, handleSidebar());
    expect(state.isOpen).toBe(false);

    state = sidebar(state, handleSidebar("open"));
    expect(state.isOpen).toBe(true);

    state = sidebar(state, handleSidebar("close"));
    expect(state.isOpen).toBe(false);
  });
});
