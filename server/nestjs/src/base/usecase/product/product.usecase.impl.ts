
import { ProductRepository, ProductRepositoryToken } from '../../repository/product.repository';
import { ProductUseCase } from './product.usecase';
import { ProductUIVO, ProductUOVO } from './vos';
import { z } from 'zod';
import { Inject } from '@nestjs/common';

const name = z.string().min(3, 'Name should be at least 3 characters').max(100, 'Name should not exceed 100 characters');
const price = z.number().min(0.5, 'Price should be at least 0.5').max(10000, 'Price should not exceed 10000');
const ProductSchema = z.object({
    name,
    price,
  });

export class ProductUseCaseImpl implements ProductUseCase {
  constructor(@Inject(ProductRepositoryToken)private productRepository: ProductRepository) {}

  async getProduct(id: number): Promise<ProductUOVO> {
    return this.productRepository.getProduct(id);
  }

  async getAllProducts(): Promise<ProductUOVO[]> {
    return this.productRepository.getAllProducts();
  }

  async createProduct(product: ProductUIVO): Promise<ProductUOVO> {
    const validatedProduct = ProductSchema.parse(product);
    return this.productRepository.createProduct(product);
  }

  async updateProduct(id: number, product: ProductUIVO): Promise<ProductUOVO> {
    const validatedProduct = ProductSchema.parse(product);
    return this.productRepository.updateProduct(id, product);
  }

  async deleteProduct(id: number): Promise<void> {
    return this.productRepository.deleteProduct(id);
  }

  async searchProductByNameAndPrice(name?: string, price?: number): Promise<ProductUOVO[]> {
    return this.productRepository.searchProductByNameAndPrice(name, price);
  }
}