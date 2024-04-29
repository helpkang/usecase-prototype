package spring.kotlin.mm.product.repository
import spring.kotlin.mm.product.repository.vo.ProductRIVO
import spring.kotlin.mm.product.repository.vo.ProductROVO

class ProductRepositoryMemoryImpl : ProductRepository {
    private val products = mutableListOf<ProductROVO>()

    override fun save(product: ProductRIVO): ProductROVO {
        val productROVO = ProductROVO(product.id, product.name, product.price)
        products.add(productROVO)
        return productROVO
    }
    override fun deleteById(id: Long) {
        products.removeIf { it.id == id }
    }
    override fun findById(id: Long): ProductROVO {
        return products.first { it.id == id }
    }
    override fun findAll(): List<ProductROVO> {
        // return immutable list
        return products.toList()
    }

    override fun findByName(name: String): List<ProductROVO> {
        return products.filter { it.name.contains(name) }
    }
}