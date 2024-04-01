import { useCallback, useEffect, useState } from "react";
import { Product } from "../../share/repository/product/Product";
import { productSchema } from "./schema/productSchema";
import { useProductRepo } from "../../share/repository/product/useProductRepo";
import { useProductAdapter } from "../../share/adapter/product/ProductAdapter";

export function useProductApiUseCase() {
  const { product, setProduct } = useProductRepo();

  const {
    products,
    addProduct,
    deleteProduct: removeProduct,
    updateProduct,
  } = useProductAdapter();
  
  const [error, setError] = useState<string>("");

  const { setPrice, price } = _useStateProduct(product, setProduct);

  const addProductOrUpdate = useCallback(() => {
    const result = productSchema.safeParse(product);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    if (product.id === 0) {
      addProduct(product);
    } else{
      updateProduct({ id: product.id, product });
    }
    setProduct({ id: 0, name: "", price: 0 });
  }, [product, setProduct, addProduct, updateProduct]);

  useEffect(() => {
    setError("");
  }, [product]);

  return {
    error,
    product,
    setProduct,
    products,
    addProductOrUpdate,
    removeProduct,
    price,
    setPrice,
    ..._useFilterProducts(products),
  };
}

function _useFilterProducts(products: Array<Product>| undefined) {
  const [filterStr, setFilterStr] = useState("");

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(
      products?.filter((product) => product.name.includes(filterStr))
    );
  }, [products, filterStr]);
  return {
    setFilterStr,
    filteredProducts,
  };
}

/**
 * 숫자에 소숫점을 넣으려고 할 때, 소숫점을 제외한 숫자만 입력되도록 처리
 * 다른 편한 방법이 많지만 이렇게도 할 수 있다고 넣어 둠
 * @param product
 * @param setProduct
 * @returns
 */
const _useStateProduct = (
  product: Product,
  setProduct: (product: Product) => void
) => {
  const [price, setPrice] = useState("");

  const newSetPrice = (value: string) => {
    const repaceValue = value.replace(/[^0-9.]/g, "");
    setPrice(repaceValue);
    setProduct({ ...product, price: Number(repaceValue) });
  };
  useEffect(() => {
    setPrice(product.price.toString());
  }, [product.price]);

  return {
    setPrice: newSetPrice,
    price,
  };
};
