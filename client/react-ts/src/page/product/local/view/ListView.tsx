import { Product } from "../../../../share/repository/product/Product";
import { Box } from "../style/Box";

type ListViewProps = {
  products: Product[];
  removeProduct: (id: string) => void;
  setProduct: (product: Product) => void;
};

export default function ListView({
  products,
  removeProduct,
  setProduct,
}: ListViewProps) {
  return (
    <>
      <h1>Product List</h1>
      {products.map((product) => (
        <Box key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.price}</p>
          <button onClick={() => removeProduct(product.id)}>Delete</button>
          <button
            onClick={() => setProduct({...product})}
          >
            Update Price
          </button>
        </Box>
      ))}
    </>
  );
}
