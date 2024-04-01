import { Box } from "../../share/style/Box";
import { useProductApiUseCase } from "./useProductApilUseCase";
import EditView from "./view/EditView";
import ListView from "./view/ListView";


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
    <div>
      <Box>
        <input
          type="text"
          placeholder="Filter products with name"
          onChange={(event) => setFilterStr(event.target.value)}
          style={{ width: "90%" }}
        />
      </Box>
      <ListView
        products={filteredProducts ? filteredProducts : []}
        removeProduct={removeProduct}
        setProduct={setProduct}
      />
      <Box>
        <EditView
          product={product}
          setProduct={setProduct}
          addProductOrUpdate={addProductOrUpdate}
          error={error}
          price={price}
          setPrice={setPrice}
        />
      </Box>
    </div>
  );
}
