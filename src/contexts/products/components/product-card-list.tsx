import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../../store";
import { addCartItem } from "../../../store/slices/shopping-cart";
import type { Product } from "../models/product";
import ProductCard from "./product-card";

export default function ProductCardList() {
  const dispatch = useAppDispatch();
  const shoppingCart = useAppSelector((state) => state.shoppingCart);
  const product = useAppSelector((state) => state.product);

  const handleAddToCart = (product: Product) => {
    dispatch(addCartItem(product));
    toast.message(`Added ${product.title} to cart!`);
  };

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {product.isLoading &&
        Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={`product-card-${index}`}
            onAddToCart={() => {}}
            disabled={false}
            loading={true}
          />
        ))}

      {product.products &&
        product.products.map((product) => (
          <ProductCard
            key={`product-card-${product.id}`}
            product={product}
            onAddToCart={() => {
              handleAddToCart(product);
            }}
            disabled={shoppingCart.items.some((item) => item.id === product.id)}
          />
        ))}
    </div>
  );
}
