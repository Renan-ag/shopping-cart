import StarIcon from "../../assets/icons/Star.svg?react";
import cx from "classnames";
import Icon from "../icon";
import Text from "../text";
import {
  starIconIconVariants,
  starRatingWrapperVariants,
} from "./star-rating.variants";
import type { ComponentProps } from "react";

interface StarRatingProps extends ComponentProps<"div"> {
  totalStars?: number;
  rating?: number;
}

export default function StarRating({
  totalStars = 5,
  rating = 0,
  className,
  ...props
}: StarRatingProps) {
  return (
    <div
      className={cx(starRatingWrapperVariants(), className)}
      aria-label={`Avaliação de ${rating} de ${totalStars} estrelas`}
      {...props}
    >
      <div className="flex gap-0.5">
        {Array.from({ length: totalStars }, (_, i) => {
          const starNumber = i + 1;

          const isFull = rating >= starNumber;
          const isHalf = rating >= starNumber - 0.5 && rating < starNumber;

          return (
            <div className="relative" key={`star-icon-${i}`}>
              <Icon
                svg={StarIcon}
                className={starIconIconVariants({ variant: "empty" })}
              />

              {isFull || isHalf ? (
                <Icon
                  svg={StarIcon}
                  className={starIconIconVariants({ isHalf: isHalf })}
                />
              ) : null}
            </div>
          );
        })}
      </div>

      <Text as="span" variant="paragraph-small" className="ps-1 pt-0.5">
        ({rating}/{totalStars})
      </Text>
    </div>
  );
}
