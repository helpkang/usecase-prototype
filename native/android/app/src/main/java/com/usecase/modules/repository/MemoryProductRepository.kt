package com.usecase.modules.repository

import com.usecase.modules.model.Product
import com.usecase.modules.model.ProductInput
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow


class MemoryProductRepository : ProductRepository {

    private val _products = MutableStateFlow<List<Product>>(emptyList())
    override val products = _products.asStateFlow()

    override suspend fun addProduct(product: Product) {
        _products.value += product
        println("Product added: ${products.value.size}")
    }

    private val _product = MutableStateFlow<ProductInput>(ProductInput(0, "", ""))
    override val product = _product.asStateFlow()

    override suspend fun setProduct(product: ProductInput) {
        _product.value = product
    }

    override suspend fun updateProduct(product: Product) {
        _products.value = _products.value.map {
            if (it.id == product.id) product else it
        }
    }
}