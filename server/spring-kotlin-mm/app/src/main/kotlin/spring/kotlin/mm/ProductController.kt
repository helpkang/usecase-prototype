package spring.kotlin.mm;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/article")
class ProductController ( private val productUseCase: ProductUseCase) {


    @GetMapping("")
    fun getProducts() = productUseCase.getProducts()
}
