package spring.kotlin.mm.product.entity

// jpa product entity
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id


@Entity(name = "product")
class ProductEntity(
    @Id @GeneratedValue var id: Long? = null,
    var name: String,
    var price: Double
)