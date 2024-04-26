package spring.kotlin.mm


import org.springframework.beans.factory.annotation.Autowired
import spring.kotlin.mm.vo.Product
import org.springframework.stereotype.Service
import java.util.NoSuchElementException

@Service
class ProductRepositoryImpl @Autowired constructor (private val productDAO: ProductDaoRepository) :
    ProductRepository {

    override fun save(product: Product): Product {
        productDAO.save(ProductEntity(product.id, product.name, product.price))
        return product
    }

    override fun deleteById(id: Long) {
        productDAO.deleteById(id)
    }

    override fun findById(id: Long): Product {
        val productEntity = productDAO.findById(id)
        if(productEntity.isEmpty) {
            throw NoSuchElementException("Product not found")
        }
        val entity = productEntity.get()
        return Product(entity.id, entity.name, entity.price)
    }

    override fun findAll(): List<Product> {
        return productDAO.findAll().map { Product(it.id, it.name, it.price) }
    }
}