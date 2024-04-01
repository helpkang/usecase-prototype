import { ProductApiContainerView } from "./ProductApiContainerView";
import { useProductApiUseCase } from "./useProductApilUseCase";

export default function ProductApiContainer() {
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
  } = useProductApiUseCase();

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
