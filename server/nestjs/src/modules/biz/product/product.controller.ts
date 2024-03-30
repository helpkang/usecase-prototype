import { Controller, Get, Post, Put, Delete, Param, Body, Inject, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ProductUseCase, ProductUseCaseToken } from 'base/usecase/product/product.usecase';
import { ProductCIVO, ProductCOVO } from './vos';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(@Inject(ProductUseCaseToken)private readonly productUseCase: ProductUseCase) {}

  @Get('search')
  @ApiOperation({ summary: 'Search products by name and price' })
  @ApiQuery({ name: 'name', required: false, description: 'The name of the product' })
  @ApiQuery({ name: 'price', required: false, description: 'The price of the product' })
  @ApiResponse({ status: 200, type: [ProductCOVO] })
  searchProductByNameAndPrice(@Query('name') name?: string, @Query('price') price?: number): Promise<ProductCOVO[]> {
    return this.productUseCase.searchProductByNameAndPrice(name, price);
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiParam({ name: 'id', required: true, description: 'The id of the product' })
  @ApiResponse({ status: 200, type: ProductCOVO })
  getProduct(@Param('id') id: number): Promise<ProductCOVO> {
    return this.productUseCase.getProduct(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, type: [ProductCOVO] })
  getAllProducts(): Promise<ProductCOVO[]> {
    return this.productUseCase.getAllProducts();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: ProductCIVO })
  @ApiResponse({ status: 201, type: ProductCOVO })
  createProduct(@Body() product: ProductCIVO): Promise<ProductCOVO> {
    return this.productUseCase.createProduct(product);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id', required: true, description: 'The id of the product' })
  @ApiBody({ type: ProductCIVO })
  @ApiResponse({ status: 200, type: ProductCOVO })
  updateProduct(@Param('id') id: number, @Body() product: ProductCIVO): Promise<ProductCOVO> {
    return this.productUseCase.updateProduct(id, product);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', required: true, description: 'The id of the product' })
  @ApiResponse({ status: 200 })
  deleteProduct(@Param('id') id: number): Promise<void> {
    return this.productUseCase.deleteProduct(id);
  }

  // @Get('search')
  // @ApiOperation({ summary: 'Search products by name and price' })
  // @ApiParam({ name: 'name', required: true, description: 'The name of the product' })
  // @ApiParam({ name: 'price', required: true, description: 'The price of the product' })
  // @ApiResponse({ status: 200, type: [ProductCOVO] })
  // searchProductByNameAndPrice(@Param('name') name: string, @Param('price') price: number): Promise<ProductCOVO[]> {
  //   return this.productUseCase.searchProductByNameAndPrice(name, price);
  // }

}