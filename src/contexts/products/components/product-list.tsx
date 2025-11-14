import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../../store";
import { addItem } from "../../../store/slices/shopping-cart";
import type { Product } from "../models/product";
import ProductCard from "./product-card";

export default function ProductList() {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product);

  const handleAddToCart = (product: Product) => {
    dispatch(addItem(product));
    toast.message(`Added ${product.title} to cart`);
  };

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {product.products &&
        product.products.map((product) => (
          <ProductCard
            key={`product-card-${product.id}`}
            product={product}
            onAddToCart={() => {
              handleAddToCart(product);
            }}
          />
        ))}
    </div>
  );
}
