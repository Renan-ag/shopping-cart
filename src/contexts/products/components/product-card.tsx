import Button from "../../../components/button";
import Icon from "../../../components/icon";
import StarRating from "../../../components/star-rating";
import Text from "../../../components/text";
import type { Product } from "../models/product";

import PlusCircleIcon from "../../../assets/icons/PlusCircle.svg?react";
import Skeleton from "../../../components/skeleton";

interface ProductCardProps {
  product?: Product;
  onAddToCart?: (product: Product) => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function ProductCard({
  product,
  onAddToCart,
  disabled = false,
  loading = false,
}: ProductCardProps) {
  return (
    <div className="px-6 py-4 shadow border border-solid border-gray-300 rounded-lg max-w-72">
      {loading && !product ? (
        <>
          <div className="flex flex-col gap-6">
            <Skeleton className="w-40 h-40 mx-auto" />
            <div className="flex justify-between gap-2">
              <Skeleton className="w-24 h-4.5" />
              <Skeleton className="w-10 h-5" />
            </div>
          </div>
          <div className="flex flex-col justify-between h-32 gap-1 mt-1.5">
            <div>
              <Skeleton className="w-48 h-6 mb-1" />
              <Skeleton className="w-20 h-4.5" />
            </div>

            {onAddToCart && <Skeleton className="w-full h-9" />}
          </div>
        </>
      ) : (
        <>
          <header className="flex flex-col gap-6">
            <img
              className="h-40 object-contain mx-auto"
              src={product?.image}
              alt={`Image of product ${product?.title}`}
            />

            <StarRating rating={product?.rating.rate} />
          </header>
          <main className="flex flex-col justify-between h-32 gap-1 mt-1.5">
            <div>
              <Text
                as="h3"
                variant="label-medium"
                title={product?.title}
                className="text-title-color line-clamp-2 font-semibold"
              >
                {product?.title}
              </Text>
              <Text as="span" variant="label-small" className="font-bold">
                Price:{" "}
                {product?.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Text>
            </div>
            {onAddToCart && (
              <Button
                type="button"
                aria-label="Add to cart"
                size="sm"
                disabled={disabled}
                className="mt-2 flex justify-center items-center"
                onClick={() => {
                  if (product) onAddToCart(product);
                }}
              >
                <span className="flex items-center gap-1.5 mx-auto">
                  {disabled ? (
                    "In Cart"
                  ) : (
                    <>
                      <Icon className="w-5.5 fill-white" svg={PlusCircleIcon} />{" "}
                      Add to Cart
                    </>
                  )}
                </span>
              </Button>
            )}
          </main>
        </>
      )}
    </div>
  );
}
