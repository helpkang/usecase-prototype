import { Product } from "../../../share/repository/product/Product";

type EditViewProps = {
  error: string;
  product: Product;
  setProduct: (product: Product) => void;
  addProductOrUpdate: () => void;
  price: string;
  setPrice: (price: string) => void;
};

export default function EditView({
  error,
  product,
  setProduct,
  addProductOrUpdate,
  price,
  setPrice,
}: EditViewProps) {
  return (
    <>
      <div>
        <input
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          placeholder="Product name"
        />
        <input
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          placeholder="Product price"
        />
        <button onClick={addProductOrUpdate}>
          id: {product.id}
          {product.id !==0 ? "Update " : "Add "}Product
        </button>
      </div>
      {error && <div>{error}</div>}
    </>
  );
}
