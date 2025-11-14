import Button from "../../../components/button";
import Icon from "../../../components/icon";
import StarRating from "../../../components/star-rating";
import Text from "../../../components/text";
import type { Product } from "../models/product";

import PlusCircleIcon from "../../../assets/icons/PlusCircle.svg?react";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const { title, price, rating, image } = product;

  return (
    <div className="px-6 py-4 shadow border border-solid border-gray-300 rounded-lg max-w-72">
      <header className="flex flex-col gap-6">
        <img
          className="h-40 object-contain mx-auto"
          src={image}
          alt={`Image of product ${title}`}
        />

        <StarRating rating={rating.rate} />
      </header>
      <main className="flex flex-col justify-between h-32 gap-1 mt-1.5">
        <div>
          <Text
            as="h3"
            variant="label-medium"
            title={title}
            className="text-title-color line-clamp-2 font-semibold"
          >
            {title}
          </Text>
          <Text as="span" variant="label-small" className="font-bold">
            Price:{" "}
            {price.toLocaleString("en-US", {
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
            className="mt-2 flex justify-center items-center"
            onClick={() => {
              onAddToCart(product);
            }}
          >
            <span className="flex items-center gap-1.5 mx-auto">
              <Icon className="w-5.5 fill-white" svg={PlusCircleIcon} /> Add to
              Cart
            </span>
          </Button>
        )}
      </main>
    </div>
  );
}
