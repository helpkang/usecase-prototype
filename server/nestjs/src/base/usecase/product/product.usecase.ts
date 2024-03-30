import { ProductUIVO, ProductUOVO } from "./vos";


export interface ProductUseCase {
    getProduct(id: number): Promise<ProductUOVO>;
    getAllProducts(): Promise<ProductUOVO[]>;
    createProduct(product: ProductUIVO): Promise<ProductUOVO>;
    updateProduct(id: number, product: ProductUIVO): Promise<ProductUOVO>;
    deleteProduct(id: number): Promise<void>;
    searchProductByNameAndPrice(name?: string, price?: number): Promise<ProductUOVO[]>;
  }

  export const ProductUseCaseToken = Symbol('ProductUseCase');