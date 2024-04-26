package spring.kotlin.mm

//import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

interface ProductDaoRepository : CrudRepository<ProductEntity, Long>