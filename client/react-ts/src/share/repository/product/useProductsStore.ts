import { create } from "zustand";
import { Product } from "./Product";
import { v4 as uuid } from "uuid";

type ProductsStore = {
  products: Product[];
  addProductOrUpdate: (product: Product) => void;
  removeProduct: (id: string) => void;
};

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  addProductOrUpdate: (product) => {
    if (product.id) {
      set((state) => ({
        products: state.products.map((p) => (p.id === product.id ? product : p)),
      }));
      return;
    }
    const newProduct = {...product, id: uuid()}
    set((state) => ({ products: [...state.products, newProduct] }));
  },
  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));
