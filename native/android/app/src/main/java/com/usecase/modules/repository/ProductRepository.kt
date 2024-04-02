package com.usecase.modules.repository

import com.usecase.modules.model.Product
import com.usecase.modules.model.ProductInput
import kotlinx.coroutines.flow.StateFlow


interface ProductRepository {
    // #### State ####
    val products: StateFlow<List<Product>>
    // #### Action ####
    suspend fun addProduct(product: Product)
    suspend fun updateProduct(product: Product)

    val product: StateFlow<ProductInput>
    suspend fun setProduct(product: ProductInput)
}

