import { create } from "zustand";
import { Product } from "./Product";

type ProductsRepoType = {
  products: Product[];
  addProductOrUpdate: (product: Product) => void;
  removeProduct: (id: number) => void;
};

export const useProductsRepo = create<ProductsRepoType>((set) => ({
  products: [],
  addProductOrUpdate: (product) => {
    if (product.id) {
      set((state) => ({
        products: state.products.map((p) =>
          p.id === product.id ? product : p
        ),
      }));
      return;
    }

    set((state) => {
      const maxProductId =
        state.products.reduce((max, p) => (p.id > max ? p.id : max), 0) + 1;
      const nproduct = { ...product, id: maxProductId };
      return { products: [...state.products, nproduct] };
    });
  },
  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));
