//interface productRepository
package spring.kotlin.mm
import spring.kotlin.mm.vo.Product

interface ProductRepository {
    fun save(product: Product): Product
    fun deleteById(id: Long)
    fun findById(id: Long): Product
    fun findAll(): List<Product>
}