//interface productRepository
package spring.kotlin.mm.product.repository
import spring.kotlin.mm.product.repository.vo.ProductRIVO
import spring.kotlin.mm.product.repository.vo.ProductROVO

interface ProductRepository {
    fun save(product: ProductRIVO): ProductROVO
    fun deleteById(id: Long)
    fun findById(id: Long): ProductROVO
    fun findAll(): List<ProductROVO>

    fun findByName(name: String): List<ProductROVO>
}