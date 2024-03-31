import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CancelablePromise,
  ProductCOVO,
  ProductsService,
} from "../../../gen/api";
import { Product } from "../../repository/product/Product";

export function useProductAdapter() {
  // const queryClient = useQueryClient();

  const products = useQuery({
    queryKey: ["products"],
    queryFn: ProductsService.getAllProducts,
  });

  const addProduct = useMutation({
    mutationFn: (product: Product) => ProductsService.createProduct(product),
    onSettled: () => {
      products.refetch();
    },
  });

  const updateProduct = useMutation({
    mutationFn: (updateProduct: { id: number; product: Product }) =>
      ProductsService.updateProduct(updateProduct.id, updateProduct.product),
    onSettled: () => {
      products.refetch();
    },
  });

  const deleteProduct = useMutation({
    mutationFn: (id: number): CancelablePromise<ProductCOVO> =>
      ProductsService.deleteProduct(id),
    onSettled: () => {
      products.refetch();
    },
  });

  return {
    products: products.data,
    addProduct: addProduct.mutate,
    updateProduct: updateProduct.mutate,
    deleteProduct: deleteProduct.mutate,
  };
}
