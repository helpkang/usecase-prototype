package com.usecase.product.repository

import com.usecase.product.entity.ProductEntity
import com.usecase.product.entity.ProductEntityRepository
import com.usecase.product.repository.vo.Product
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import java.util.NoSuchElementException

@Component
class ProductRepositoryImpl : ProductRepository {

    @Autowired
    private lateinit var productEntityRepository: ProductEntityRepository

    override fun save(product: Product): Product {
        productEntityRepository.save(ProductEntity(product.id, product.name, product.price))
        return product
    }

    override fun deleteById(id: Long) {
        productEntityRepository.deleteById(id)
    }

    override fun findById(id: Long): Product {
        val productEntity = productEntityRepository.findById(id)
        if(productEntity.isEmpty) {
            throw NoSuchElementException("Product not found")
        }
        val entity = productEntity.get()
        return Product(entity.id, entity.name, entity.price)
    }

    override fun findAll(): List<Product> {
        return productEntityRepository.findAll().map { Product(it.id, it.name, it.price) }
    }
}