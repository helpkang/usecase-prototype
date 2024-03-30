import { useProductStore } from './useProductStore';
import { useProductsStore } from './useProductsStore';

export const useProductRepo = () => {
  const productStore = useProductStore();
  const productsStore = useProductsStore();

  return {
    product: productStore.product,
    setProduct: productStore.setProduct,
    products: productsStore.products,
    addProduct: productsStore.addProduct,
    removeProduct: productsStore.removeProduct,
  };
}