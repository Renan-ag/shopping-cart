import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  isOpenSidebar: boolean;
}

const initialState: SidebarState = {
  isOpenSidebar: false,
};

export const sidebarSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    handleSidebar(state, action: PayloadAction<"open" | "close">) {
      if (action.payload === "open") {
        state.isOpenSidebar = true;
      } else if (action.payload === "close") {
        state.isOpenSidebar = false;
      } else {
        state.isOpenSidebar = !state.isOpenSidebar;
      }
    },
  },
});

export const sidebar = sidebarSlice.reducer;

export const { handleSidebar } = sidebarSlice.actions;
