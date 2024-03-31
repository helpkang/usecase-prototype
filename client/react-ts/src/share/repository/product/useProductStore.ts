import { create } from "zustand";
import { Product } from "./Product";

type ProductStore = {
  product: Product;
  setProduct: (product: Product) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  product: { id: "", name: "", price: 0 },
  setProduct: (product) => {
    set({ product })
  },
}));
