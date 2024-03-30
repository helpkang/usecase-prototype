import { create } from "zustand";
import { Product } from "./Product";

type ProductStore = {
  product: Product | null;
  setProduct: (product: Product) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  product: null,
  setProduct: (product) => set({ product }),
}));
