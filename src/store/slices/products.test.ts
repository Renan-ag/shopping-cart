import { describe, it, expect, beforeEach, vi, type Mocked } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import type { AxiosInstance, AxiosResponse } from "axios";
import { product, loadProducts, type ProductState } from "./products";
import { api } from "../../helpers/api";
import type { Product } from "../../contexts/products/models/product";

vi.mock("../../helpers/api", async () => {
  const actual = await vi.importActual("../../helpers/api");
  return {
    ...actual,
    api: {
      get: vi.fn(),
    },
  };
});

const mockedApi = api as unknown as Mocked<AxiosInstance>;

describe("productSlice", () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      rating: {
        rate: 3.9,
        count: 120,
      },
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men's clothing",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",

      rating: {
        rate: 4.1,
        count: 259,
      },
    },
  ];

  let store: ReturnType<typeof configureStore<{ product: ProductState }>>;

  beforeEach(() => {
    store = configureStore({
      reducer: { product },
    });
    vi.clearAllMocks();
  });

  it("Should product state start with this values", () => {
    expect(store.getState().product).toEqual({
      products: [],
      isLoading: false,
      error: null,
    });
  });

  describe("loadProducts thunk", () => {
    it("Should load products with success", async () => {
      mockedApi.get.mockResolvedValue({
        data: mockProducts,
        status: 200,
        statusText: "OK",
        config: {},
        headers: {},
      } as AxiosResponse<Product[]>);

      const result = await store.dispatch(loadProducts());

      expect(mockedApi.get).toHaveBeenCalledWith("/products");
      expect(mockedApi.get).toHaveBeenCalledTimes(1);

      expect(result.type).toBe("products/load/fulfilled");
      expect(result.payload).toEqual(mockProducts);

      expect(store.getState().product).toEqual({
        error: null,
        products: mockProducts,
        isLoading: false,
      });
    });

    it("Should 'isLoading' is true when the promise is pending", () => {
      const pendingPromise = new Promise<AxiosResponse<Product[]>>(() => {});
      mockedApi.get.mockReturnValue(pendingPromise);

      store.dispatch(loadProducts());

      expect(store.getState().product.isLoading).toBe(true);
    });

    it("Should 'rejected' stop loading and set an error message", async () => {
      const axiosError = {
        isAxiosError: true,
        message: "Request failed with status code 500",
        response: { status: 500, data: null },
        config: {},
      };

      mockedApi.get.mockRejectedValue(axiosError);

      const result = await store.dispatch(loadProducts());

      expect(result.type).toBe("products/load/rejected");

      expect(store.getState().product).toEqual({
        error: {
          message: expect.any(String),
        },
        products: [],
        isLoading: false,
      });
    });
  });

  describe("extraReducers", () => {
    it("pending → 'isLoading' is true", () => {
      const state = product(
        { products: mockProducts, isLoading: false, error: null },
        loadProducts.pending("", undefined),
      );
      expect(state.isLoading).toBe(true);
      expect(state.products).toEqual(mockProducts);
    });

    it("fulfilled → update the products and 'isLoading' is false", () => {
      const state = product(
        { products: [], isLoading: true, error: null },
        loadProducts.fulfilled(mockProducts, "", undefined),
      );
      expect(state).toEqual({
        error: null,
        products: mockProducts,
        isLoading: false,
      });
    });
  });
});
