import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import { shoppingCart } from "./slices/shopping-cart";
import { product } from "./slices/products";
import { sidebar } from "./slices/sidebar";

export const store = configureStore({
  reducer: { shoppingCart, product, sidebar },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
