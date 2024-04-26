package spring.kotlin.mm
import spring.kotlin.mm.vo.Product

interface ProductUseCase {
    fun createProduct(product: Product): Product
    fun updateProduct(product: Product): Product
    fun deleteProduct(id: Long)
    fun getProduct(id: Long): Product
    fun getProducts(): List<Product>
}