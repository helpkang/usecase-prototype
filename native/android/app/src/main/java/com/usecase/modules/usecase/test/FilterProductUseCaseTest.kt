package com.usecase.modules.usecase.test


import com.usecase.modules.model.Product
import com.usecase.modules.repository.MemoryProductRepository
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest

import com.usecase.modules.usecase.ProductUseCase
import com.usecase.modules.usecase.ProductUseCaseImpl
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

class FilterProductUseCaseTest {
    private lateinit var productUseCase: ProductUseCase

    @BeforeEach
    fun setup() {
        productUseCase = ProductUseCaseImpl(MemoryProductRepository())
    }

    @OptIn(ExperimentalCoroutinesApi::class)
    @Test
    fun filter_product() =  runTest {
        var product = Product(0, "Test Product", 100.0)
        productUseCase.addProduct(product)
        Thread.sleep(10)
        product = Product(0, "Product", 30.0)
        productUseCase.addProduct(product)

        val products = productUseCase.products
        Thread.sleep(40)
        assertEquals(2, products.value.size)
        val filterProduct = productUseCase.filterProduct
        assertEquals(2, filterProduct.value.size)

        productUseCase.setFilterStr("Test Product")
        Thread.sleep(1)
        assertEquals(1, filterProduct.value.size)

    }


}
