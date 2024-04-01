// src/product/product.service.ts

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'base/entity/product.entity';
import { Repository } from 'typeorm';
import { ProductRepository } from './product.repository';
import { ProductRIVO, ProductROVO } from './vos';


@Injectable()
export class ProductRepositoryImpl implements ProductRepository{
  constructor(
    @InjectRepository(Product)
    private productDAO: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<ProductROVO[]> {
    return this.productDAO.find();
  }

  async getProduct(id: number): Promise<ProductROVO> {
    return this.productDAO.findOne(id);
  }

  async createProduct(productData: Partial<ProductRIVO>): Promise<ProductROVO> {
    //TODO: id from request body should be removed nestjs problem - Security Risk
    //TODO: remove this console.log 
    console.log('productData', productData);
    const product = this.productDAO.create({name: productData.name, price: productData.price});
    return this.productDAO.save(product);
  }

  async updateProduct(id: number, productData: Partial<ProductRIVO>): Promise<ProductROVO> {
    await this.productDAO.update(id, productData);
    return this.productDAO.findOne(id);
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productDAO.delete(id);
  }

  // async searchProductByNameAndPrice(name: string, price: number): Promise<ProductROVO[]> {
  //   return this.productDAO
  //     .createQueryBuilder('product')
  //     .where('product.name = :name', { name })
  //     .andWhere('product.price = :price', { price })
  //     .getMany();
  // }

  searchProductByNameAndPrice(name?: string, price?: number): Promise<Product[]> {
    if (!name && !price) {
      throw new BadRequestException('Either name or price must be provided');
    }
  
    if (name && price) {
      // search by name and price
      return this.productDAO.find({ name, price });
    } else if (name) {
      // search by name
      return this.productDAO.find({ name });
    } else {
      // search by price
      return this.productDAO.find({ price });
    }
  }
}
