import { useProductRepo } from './useProductRepo';
import { useProductsRepo } from './useProductsRepo';

export const useProductAllRepo = () => {
  const productStore = useProductRepo();
  const productsStore = useProductsRepo();

  return {
    product: productStore.product,
    setProduct: productStore.setProduct,
    products: productsStore.products,
    addProduct: productsStore.addProductOrUpdate,
    removeProduct: productsStore.removeProduct,
  };
}