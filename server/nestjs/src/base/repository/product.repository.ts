import { ProductRIVO, ProductROVO } from "./vos";

export interface ProductRepository {
    getProduct(id: number): Promise<ProductROVO>;
    getAllProducts(): Promise<ProductROVO[]>;
    createProduct(product: ProductRIVO): Promise<ProductROVO>;
    updateProduct(id: number, product: ProductRIVO): Promise<ProductROVO>;
    deleteProduct(id: number): Promise<void>;
    searchProductByNameAndPrice(name?: string, price?: number): Promise<ProductROVO[]>;
  }

  export const ProductRepositoryToken = Symbol('ProductRepository');