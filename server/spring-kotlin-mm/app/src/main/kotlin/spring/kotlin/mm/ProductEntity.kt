package spring.kotlin.mm

// jpa product entity
import jakarta.persistence.*
import org.springframework.data.jpa.repository.config.EnableJpaRepositories


@Entity(name = "product")
class ProductEntity(
    @Id @GeneratedValue var id: Long? = null,
    var name: String,
    var price: Double
)