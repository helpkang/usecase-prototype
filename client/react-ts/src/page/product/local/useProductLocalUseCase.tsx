import { useCallback, useEffect, useState } from "react";
import { useProductRepo } from "../../../share/repository/product/useProductRepo";
import { z } from "zod";
import { Product } from "../../../share/repository/product/Product";

const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(100, { message: "Name must be no more than 100 characters long" }),
  price: z
    .number()
    .min(0.5, { message: "Price must be at least 0.5" })
    .max(10000, { message: "Price must be no more than 10,000" }),
});

export function useProductLocalUseCase() {
  const {
    product,
    setProduct,
    products,
    addProduct: repoAddProduct,
    removeProduct,
  } = useProductRepo();
  const [error, setError] = useState<string>("");

  const { setPrice, price } = _useStateProduct(product, setProduct);

  const addProductOrUpdate = useCallback(() => {
    const result = productSchema.safeParse(product);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    repoAddProduct(product!);
    setProduct({ id: "", name: "", price: 0 });
  }, [product, repoAddProduct, setProduct, setError]);

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

function _useFilterProducts(products: Product[]) {
  const [filterStr, setFilterStr] = useState("");

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => product.name.includes(filterStr))
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
const _useStateProduct = (product: Product, setProduct: (product: Product) => void) => {
  const [price, setPrice] = useState("");

  const newSetPrice = (value: string) => {
    const repaceValue = value.replace(/[^0-9.]/g, "");
    setPrice(repaceValue);
    setProduct({ ...product, price: Number(repaceValue) });
  }
  useEffect(() => {
    setPrice(product.price.toString());
  }, [product.price]);

  return {
    setPrice: newSetPrice,
    price,
  }
}