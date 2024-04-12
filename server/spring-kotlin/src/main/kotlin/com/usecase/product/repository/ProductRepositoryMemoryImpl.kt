package com.usecase.product.repository
import com.usecase.product.repository.vo.Product

class ProductRepositoryMemoryImpl : ProductRepository {
    private val products = mutableListOf<Product>()

    override fun save(product: Product): Product {
        products.add(product)
        return product
    }
    override fun deleteById(id: Long) {
        products.removeIf { it.id == id }
    }
    override fun findById(id: Long): Product {
        return products.first { it.id == id }
    }
    override fun findAll(): List<Product> {
        // return immutable list
        return products.toList()
    }
}