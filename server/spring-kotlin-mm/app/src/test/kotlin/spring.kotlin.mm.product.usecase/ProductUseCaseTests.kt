//ProductUseCaseTests
package spring.kotlin.mm.product.usecase

import spring.kotlin.mm.vo.Product
import spring.kotlin.mm.ProductRepositoryMemoryImpl
import org.junit.jupiter.api.BeforeEach

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import spring.kotlin.mm.ProductUseCase
import spring.kotlin.mm.ProductUseCaseImpl
import java.util.NoSuchElementException

//@SpringBootTest
//@EnableJpaRepositories(basePackages = ["spring.kotlin.mm.product.entity", "spring.kotlin.mm.entity"])
//@EnableJpaRepositories(basePackages = ["spring.kotlin.mm.product.repository"])
//@EnableJpaRepositories
class ProductUseCaseTests {

//    @Autowired
    private lateinit var productUseCase: ProductUseCase

//    @Autowired
//    private lateinit var applicationContext: ApplicationContext

    @BeforeEach
    fun setUp() {
        this.productUseCase = ProductUseCaseImpl(ProductRepositoryMemoryImpl())
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