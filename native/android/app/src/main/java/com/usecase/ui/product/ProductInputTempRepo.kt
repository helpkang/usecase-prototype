package com.usecase.ui.product

import com.usecase.modules.common.share.CoroutineScopeUse
import com.usecase.modules.model.Product
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.launch

data class ProductTemp(val id: Int, val name: String, val price: String)

class ProductInputTempRepo(initProduct: StateFlow<Product>) : CoroutineScopeUse() {


//    val id = initProduct.value.id
//    val name = initProduct.value.name
//    val price = initProduct.value.price
    private val _product = MutableStateFlow<ProductTemp>(ProductTemp(0, "", ""))
    val product = _product.asStateFlow()

    fun setProduct(product: ProductTemp) {
        launch {
            _product.value = ProductTemp(product.id, product.name, product.price.toString())
        }
    }

    init{
        println("ProductInputTempRepo####")
        launch {
            initProduct.collect {
                println("change......")
                _product.value = ProductTemp(it.id, it.name, it.price.toString())
            }
        }
    }
}
