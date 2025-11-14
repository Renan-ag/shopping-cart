import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import { Toaster } from "sonner";
import ProductListPage from "./pages/product-list";

function App() {
  return (
    <>
      <ReduxProvider store={store}>
        <Toaster position="bottom-right" closeButton />
        <ProductListPage />
      </ReduxProvider>
    </>
  );
}

export default App;
