package spring.kotlin.mm.product.repository


import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import spring.kotlin.mm.product.dao.ProductDaoRepository
import spring.kotlin.mm.product.entity.ProductEntity
import spring.kotlin.mm.product.repository.vo.ProductRIVO
import spring.kotlin.mm.product.repository.vo.ProductROVO

@Service
class ProductRepositoryImpl @Autowired constructor (private val productDAO: ProductDaoRepository) :
    ProductRepository {

    override fun save(product: ProductRIVO): ProductROVO {
        val productEntity = productDAO.save(ProductEntity(product.id, product.name, product.price))
        return ProductROVO(productEntity.id, productEntity.name, productEntity.price)
    }

    override fun deleteById(id: Long) {
        productDAO.deleteById(id)
    }

    override fun findById(id: Long): ProductROVO {
        val productEntity = productDAO.findById(id)
        if(productEntity.isEmpty) {
            throw NoSuchElementException("Product not found")
        }
        val entity = productEntity.get()
        return ProductROVO(entity.id, entity.name, entity.price)
    }

    override fun findAll(): List<ProductROVO> {
        return productDAO.findAll().map { ProductROVO(it.id, it.name, it.price) }
    }

    override fun findByName(name: String): List<ProductROVO> {
        return productDAO.findByName(name).map { ProductROVO(it.id, it.name, it.price) }
    }
}