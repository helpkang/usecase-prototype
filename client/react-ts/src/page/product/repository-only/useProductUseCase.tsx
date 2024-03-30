import { useProductRepo } from '../../../share/repository/product/useProductRepo';

export const useProductUseCase = () => {
  const { product, setProduct, products, addProduct, removeProduct } = useProductRepo();
  return { product, setProduct, products, addProduct, removeProduct };
};