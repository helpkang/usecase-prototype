package spring.kotlin.mm.config

import org.springframework.boot.ApplicationRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import spring.kotlin.mm.product.dao.ProductDaoRepository
import spring.kotlin.mm.product.entity.ProductEntity

@Configuration
class DBLoadConfiguration {

	@Bean
	fun databaseInitializer(productDAO: ProductDaoRepository) = ApplicationRunner {

		productDAO.save(
			ProductEntity(
				name = "Product 1",
				price = 100.0,

		)
		)
		productDAO.save(
			ProductEntity(
				name = "Product 2",
				price = 200.0,
		)
		)
	}
}
