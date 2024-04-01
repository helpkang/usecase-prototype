import { create } from "zustand";
import { Product } from "./Product";

type ProductRepoType = {
  product: Product;
  setProduct: (product: Product) => void;
};

export const useProductRepo = create<ProductRepoType>((set) => ({
  product: { id: 0, name: "", price: 0 },
  setProduct: (product) => {
    set({ product })
  },
}));
