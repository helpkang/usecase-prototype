package spring.kotlin.mm.product.dao

//import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.CrudRepository
import spring.kotlin.mm.product.entity.ProductEntity

interface ProductDaoRepository : CrudRepository<ProductEntity, Long>{
    fun findByName(name: String): List<ProductEntity>
}