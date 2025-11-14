import ProductList from "../../contexts/products/components/product-list";
import Container from "../container";

export default function MainContent() {
  return (
    <Container as="main" className="mt-4">
      <ProductList />
    </Container>
  );
}
