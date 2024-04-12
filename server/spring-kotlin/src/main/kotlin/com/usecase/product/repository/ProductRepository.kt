//interface productRepository
package com.usecase.product.repository
import com.usecase.product.repository.vo.Product

interface ProductRepository {
    fun save(product: Product): Product
    fun deleteById(id: Long)
    fun findById(id: Long): Product
    fun findAll(): List<Product>
}