package com.usecase.product.usecase
import org.springframework.stereotype.Service
import com.usecase.product.repository.ProductRepository
import com.usecase.product.repository.vo.Product
import org.springframework.beans.factory.annotation.Autowired

@Service
class ProductUseCaseImpl(@Autowired private val productRepository: ProductRepository) :
    ProductUseCase {
    override fun createProduct(product: Product): Product {
        return productRepository.save(product)
    }

    override fun updateProduct(product: Product): Product {
        return productRepository.save(product)
    }

    override fun deleteProduct(id: Long) {
        productRepository.deleteById(id)
    }

    override fun getProduct(id: Long): Product {
        return productRepository.findById(id)
        // .orElseThrow { throw NotFoundException("Product not found") }
    }

    override fun getProducts(): List<Product> {
        return productRepository.findAll()
    }
}