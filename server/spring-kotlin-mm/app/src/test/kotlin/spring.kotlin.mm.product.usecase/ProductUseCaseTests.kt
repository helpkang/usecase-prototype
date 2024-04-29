//ProductUseCaseTests
package spring.kotlin.mm.product.usecase

import spring.kotlin.mm.product.repository.ProductRepositoryMemoryImpl
import org.junit.jupiter.api.BeforeEach

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.ApplicationContext
import spring.kotlin.mm.product.usecase.vo.ProductUIVO
import java.util.NoSuchElementException

@SpringBootTest(classes = [ProductUseCaseImpl::class, ProductRepositoryMemoryImpl::class])
class ProductUseCaseTests {

//    @Autowired
    private lateinit var productUseCase: ProductUseCase

    @Autowired
    private lateinit var applicationContext: ApplicationContext

    @BeforeEach
    fun setUp() {
//        this.productUseCase = ProductUseCaseImpl(ProductRepositoryMemoryImpl())
        this.productUseCase = applicationContext.getBean(ProductUseCase::class.java)
    }

    @Test
    fun `should save product`() {
        val productUIVO = ProductUIVO(1, "Product 1", 100.0)
        productUseCase.createProduct(productUIVO)
        val productUOVO = productUseCase.getProduct(1)
        assert( productUIVO.id == productUOVO.id)
        assert( productUIVO.name == productUOVO.name)
        assert( productUIVO.price == productUOVO.price)

        val retProducts = productUseCase.getProducts()
        assert(retProducts.size == 1)
    }

    @Test
    fun `should get product by id`() {
        productUseCase.deleteProduct(1)
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