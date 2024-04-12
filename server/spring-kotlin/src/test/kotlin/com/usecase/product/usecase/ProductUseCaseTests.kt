//ProductUseCaseTests
package com.usecase.product.usecase

import com.usecase.product.repository.vo.Product
import com.usecase.product.repository.ProductRepositoryMemoryImpl
import org.junit.jupiter.api.BeforeEach

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.ApplicationContext
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import java.util.NoSuchElementException

@SpringBootTest
@EnableJpaRepositories(basePackages = ["com.usecase.product.entity"])
class ProductUseCaseTests {

    @Autowired
    private lateinit var productUseCase: ProductUseCase

//    @Autowired
//    private lateinit var applicationContext: ApplicationContext

    @BeforeEach
    fun setUp() {
//        this.productUseCase = ProductUseCaseImpl(ProductRepositoryMemoryImpl())
//        this.productUseCase = applicationContext.getBean(ProductUseCase::class.java)
    }

    @Test
    fun `should save product`() {
        val product = Product(1, "Product 1", 100.0)
        productUseCase.createProduct(product)
        val retProduct = productUseCase.getProduct(1)
        assert(retProduct == product)

        val retProducts = productUseCase.getProducts()
        assert(retProducts.size == 1)
    }

    @Test
    fun `should delete product by id`() {
        productUseCase.deleteProduct(1)
    }

    @Test
    fun `should get product by id`() {
        // java.util.NoSuchElementException: Collection contains no element matching the predicate
        assertThrows<NoSuchElementException> {
            productUseCase.getProduct(1)
        }

    }

    @Test
    fun `should all products`() {
        productUseCase.getProducts()
    }
}