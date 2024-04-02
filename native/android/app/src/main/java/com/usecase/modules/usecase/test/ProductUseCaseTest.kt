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

class ProductUseCaseTest {
    private lateinit var productUseCase: ProductUseCase

    @BeforeEach
    fun setup() {
        productUseCase = ProductUseCaseImpl(MemoryProductRepository())
    }

    @OptIn(ExperimentalCoroutinesApi::class)
    @Test
    fun add_product_adds_product_to_repository() = runTest{

        val product = Product(0, "Test Product", 100.0)
        productUseCase.addProduct(product)

        val products = productUseCase.products
        Thread.sleep(10)
        assertEquals(1, products.value.size)
        assertEquals(product.copy(id=1), products.value[0])
    }

    @OptIn(ExperimentalCoroutinesApi::class)
    @Test
    fun add_product_adds_product_to_repository_order_change() = runTest{

        val products = productUseCase.products

        val product = Product(0, "Test Product", 100.0)
        productUseCase.addProduct(product)
        Thread.sleep(10)

        assertEquals(1, products.value.size)
        assertEquals(product.copy(id=1), products.value[0])
    }
}
