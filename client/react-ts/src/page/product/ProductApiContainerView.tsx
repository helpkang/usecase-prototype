import { Product } from "../../share/repository/product/Product";
import { Box } from "../../share/style/Box";
import EditView from "./view/EditView";
import ListView from "./view/ListView";

interface ProductApiContainerViewProps {
  setFilterStr: (filterStr: string) => void;
  filteredProducts: Product[]|undefined;
  removeProduct: (id: number) => void;
  setProduct: (product: Product) => void;
  product: Product;
  addProductOrUpdate: () => void;
  error: string;
  price: string;
  setPrice: (price: string) => void;
}

export function ProductApiContainerView({
  setFilterStr,
  filteredProducts,
  removeProduct,
  setProduct,
  product,
  addProductOrUpdate,
  error,
  price,
  setPrice,
}: ProductApiContainerViewProps) {
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
