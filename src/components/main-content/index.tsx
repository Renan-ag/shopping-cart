import ProductCardList from "../../contexts/products/components/product-card-list";
import Container from "../container";

export default function MainContent() {
  return (
    <Container as="main" className="mt-4">
      <ProductCardList />
    </Container>
  );
}
