package spring.kotlin.mm.product.usecase
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import spring.kotlin.mm.product.repository.ProductRepository
import spring.kotlin.mm.product.repository.vo.ProductROVO
import spring.kotlin.mm.product.repository.vo.ProductRIVO
import spring.kotlin.mm.product.usecase.vo.ProductUIVO
import spring.kotlin.mm.product.usecase.vo.ProductUOVO

@Service
class ProductUseCaseImpl(@Autowired private val productRepository: ProductRepository) :
    ProductUseCase {
    override fun createProduct(product: ProductUIVO): ProductUOVO {

        val productROVO =  productRepository.save(ProductRIVO(product.id, product.name, product.price))
        return ProductUOVO(productROVO.id, productROVO.name, productROVO.price)
    }

    override fun updateProduct(product: ProductUIVO): ProductUOVO {
        val productROVO =  productRepository.save(ProductRIVO(product.id, product.name, product.price))
        return ProductUOVO(productROVO.id, productROVO.name, productROVO.price)
    }

    override fun deleteProduct(id: Long) {
        productRepository.deleteById(id)
    }

    override fun getProduct(id: Long): ProductUOVO {
        val productROVO = productRepository.findById(id)
        return ProductUOVO(productROVO.id, productROVO.name, productROVO.price)
        // .orElseThrow { throw NotFoundException("Product not found") }
    }

    override fun getProducts(): List<ProductUOVO> {
        return productRepository.findAll()
            .map { ProductUOVO(it.id, it.name, it.price) }
    }

    override fun search(name: String): List<ProductUOVO> {
        return productRepository.findByName(name).map { ProductUOVO(it.id, it.name, it.price) }
    }
}