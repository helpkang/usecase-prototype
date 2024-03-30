import { Test, TestingModule } from '@nestjs/testing';
import { ProductUseCase } from '../product.usecase';
import { ProductUseCaseImpl } from '../product.usecase.impl';
import {
  ProductRepository,
  ProductRepositoryToken,
} from '../../../repository/product.repository';
import { ZodError } from 'zod';
import { create } from 'domain';

describe('ProductService', () => {
  let service: ProductUseCase;
  let mockProductRepository: jest.Mocked<ProductRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductUseCaseImpl,
        {
          provide: ProductRepositoryToken,
          useValue: { createProduct: jest.fn(), updateProduct: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<ProductUseCase>(ProductUseCaseImpl);
    mockProductRepository = module.get<jest.Mocked<ProductRepository>>(
      ProductRepositoryToken,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a product', async () => {
    const product = { id: 1, name: 'Test Product', price: 100 };
    mockProductRepository.createProduct.mockResolvedValue(
      Promise.resolve(product),
    );
    const result = await service.createProduct(product);
    expect(result).toEqual(product);
    expect(mockProductRepository.createProduct).toHaveBeenCalledWith(product);
  });

  it('should throw an error when creating a product with validation', async () => {
    const product = { name: 'Te', price: 100 };
    await expect(service.createProduct(product)).rejects.toThrowError(ZodError);
    expect(mockProductRepository.createProduct).not.toHaveBeenCalled();
  });

  it('should throw an error when update a product with validation', async () => {
    const product = { name: 'Te', price: 100 };
    await expect(service.updateProduct(1, product)).rejects.toThrowError(
      ZodError,
    );
    expect(mockProductRepository.createProduct).not.toHaveBeenCalled();
  });

  it('should throw an error when create a product with price less than 0.5', async () => {
    const product = { name: 'Test Product', price: 0.4 };
    await expect(service.createProduct(product)).rejects.toThrowError(ZodError);
    expect(mockProductRepository.createProduct).not.toHaveBeenCalled();
  });

  it('should throw an error when create a product with price greater than 10000', async () => {
    const product = { name: 'Test Product', price: 10001 };
    await expect(service.createProduct(product)).rejects.toThrowError(ZodError);
    expect(mockProductRepository.createProduct).not.toHaveBeenCalled();
  });

  it('should throw an error when update a product with price less than 0.5', async () => {
    const product = { name: 'Test Product', price: 0.4 };
    await expect(service.updateProduct(1, product)).rejects.toThrowError(
      ZodError,
    );
    expect(mockProductRepository.updateProduct).not.toHaveBeenCalled();
  });

  it('should throw an error when update a product with price greater than 10000', async () => {
    const product = { name: 'Test Product', price: 10001 };
    await expect(service.updateProduct(1, product)).rejects.toThrowError(
      ZodError,
    );
    expect(mockProductRepository.updateProduct).not.toHaveBeenCalled();
  });

  it('should update a product', async () => {
    const id = 1;
    const reqProduct = { name: 'Test Product', price: 100 };
    const retProduct = { id, ...reqProduct };
    mockProductRepository.updateProduct.mockResolvedValue(
      Promise.resolve(retProduct),
    );
    const result = await service.updateProduct(id, reqProduct);
    expect(result).toEqual(retProduct);
    expect(mockProductRepository.updateProduct).toHaveBeenCalledWith(
      id,
      reqProduct,
    );
  });
});
