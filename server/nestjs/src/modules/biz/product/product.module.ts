import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductUseCaseToken } from 'base/usecase/product/product.usecase';
import { ProductUseCaseImpl } from 'base/usecase/product/product.usecase.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'base/entity/product.entity';
import { ProductRepositoryToken } from 'base/repository/product.repository';
import { ProductRepositoryImpl } from 'base/repository/product.repository.impl';

@Module({
  controllers: [ProductController],
  providers: [
    {
      provide: ProductUseCaseToken,
      useClass: ProductUseCaseImpl,
    },
    {
      provide: ProductRepositoryToken,
      useClass: ProductRepositoryImpl,
    },
  ],
  imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductModule {}
