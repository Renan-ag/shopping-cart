import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: false,
};

export const sidebarSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    handleSidebar(state, action: PayloadAction<"open" | "close" | undefined>) {
      if (action?.payload === "open") {
        state.isOpen = true;
      } else if (action?.payload === "close") {
        state.isOpen = false;
      } else {
        state.isOpen = !state.isOpen;
      }
    },
  },
});

export const sidebar = sidebarSlice.reducer;

export const { handleSidebar } = sidebarSlice.actions;
