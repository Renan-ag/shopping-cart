import {
  skeletonVariants,
  type SkeletonVariantsProps,
} from "./skeleton.variants";

interface SkeletonProps
  extends SkeletonVariantsProps,
    React.ComponentProps<"div"> {}

export default function Skeleton({
  rounded,
  className,
  ...props
}: SkeletonProps) {
  return (
    <div className={skeletonVariants({ rounded, className })} {...props} />
  );
}
