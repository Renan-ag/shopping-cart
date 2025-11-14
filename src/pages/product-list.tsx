import { useEffect } from "react";
import MainContent from "../components/main-content";
import MainHeader from "../components/main-header";
import { useAppDispatch } from "../store";
import { loadProducts } from "../store/slices/products";

export default function ProductListPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  return (
    <>
      <MainHeader />
      <MainContent />
    </>
  );
}
