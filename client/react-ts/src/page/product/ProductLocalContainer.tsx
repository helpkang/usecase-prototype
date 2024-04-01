import { useProductLocalUseCase } from "./useProductLocalUseCase";
import { ProductApiContainerView } from "./ProductApiContainerView";

export default function ProductLocalContainer() {
  const {
    setFilterStr,
    product,
    setProduct,
    filteredProducts,
    addProductOrUpdate,
    removeProduct,
    error,
    price,
    setPrice,
  } = useProductLocalUseCase();

  return (
    <ProductApiContainerView
      setFilterStr={setFilterStr}
      filteredProducts={filteredProducts}
      removeProduct={removeProduct}
      setProduct={setProduct}
      product={product}
      addProductOrUpdate={addProductOrUpdate}
      error={error}
      price={price}
      setPrice={setPrice}
    />
  );
}
