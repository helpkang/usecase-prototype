package spring.kotlin.mm.product.controller;

import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.kotlin.mm.product.controller.vo.ProductCIVO
import spring.kotlin.mm.product.controller.vo.ProductCOVO
import spring.kotlin.mm.product.usecase.ProductUseCase
import spring.kotlin.mm.product.repository.vo.ProductROVO
import spring.kotlin.mm.product.repository.vo.ProductRIVO
import spring.kotlin.mm.product.usecase.vo.ProductUIVO
import spring.kotlin.mm.product.usecase.vo.ProductUOVO

@RestController
@RequestMapping("/api/product")
class ProductController ( private val productUseCase: ProductUseCase) {


    @GetMapping("")
    fun getProducts() = productUseCase.getProducts().map { convertCOVO(it) }


    @GetMapping("/{id}")
    fun getProduct(id: Long) = convertCOVO(productUseCase.getProduct(id))

    private fun convertCOVO(productUOVO: ProductUOVO): ProductCOVO {
        return ProductCOVO(productUOVO.id, productUOVO.name, productUOVO.price)
    }

    @PostMapping("")
    fun createProduct(productCIVO: ProductCIVO) = convertCOVO(productUseCase.createProduct(convertRIVO(productCIVO)))

    private fun convertRIVO(productCIVO: ProductCIVO): ProductUIVO {
        return ProductUIVO(productCIVO.id, productCIVO.name, productCIVO.price)
    }


    @PutMapping("")
    fun updateProduct(productCIVO: ProductCIVO) = convertCOVO(productUseCase.updateProduct(convertRIVO(productCIVO)))


    @DeleteMapping("/{id}")
    fun deleteProduct(id: Long) = productUseCase.deleteProduct(id)


    @GetMapping("/search")
    fun searchProductByName(name: String) = productUseCase.search(name).map { convertCOVO(it) }


}
