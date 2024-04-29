package spring.kotlin.mm.product.usecase
import spring.kotlin.mm.product.repository.vo.ProductROVO
import spring.kotlin.mm.product.repository.vo.ProductRIVO
import spring.kotlin.mm.product.usecase.vo.ProductUIVO
import spring.kotlin.mm.product.usecase.vo.ProductUOVO

interface ProductUseCase {
    fun createProduct(product: ProductUIVO): ProductUOVO
    fun updateProduct(product: ProductUIVO): ProductUOVO
    fun deleteProduct(id: Long)
    fun getProduct(id: Long): ProductUOVO
    fun getProducts(): List<ProductUOVO>

    fun search(name: String): List<ProductUOVO>
}