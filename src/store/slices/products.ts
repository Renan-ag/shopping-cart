import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../helpers/api";
import type { Product } from "../../contexts/products/models/product";

export interface ProductState {
  products: Product[];
  isLoading: boolean;
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
};

export const loadProducts = createAsyncThunk("products/load", async () => {
  const { data } = await api.get<Product[]>("/products");
  return data;
});

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    });
    builder.addCase(loadProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadProducts.rejected, (state, action) => {
      state.products = [];
      state.isLoading = false;

      if (action.payload) {
        console.error("Erro conhecido:", action.payload);
      } else {
        console.error("Erro inesperado:", action.error.message);
      }
    });
  },
});

export const product = productSlice.reducer;
