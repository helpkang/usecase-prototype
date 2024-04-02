package com.usecase.modules.usecase

import com.usecase.modules.common.share.CoroutineScopeUse
import com.usecase.modules.model.Product
import com.usecase.modules.model.ProductInput
import com.usecase.modules.repository.ProductRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.launch


class ProductUseCaseImpl(private val productRepository: ProductRepository) : ProductUseCase,
    CoroutineScopeUse() {

    override val products = productRepository.products

    private val _filterStr = MutableStateFlow("")
    override fun setFilterStr(value: String) {
        _filterStr.value = value
    }


    override fun addProduct(product: Product) {
        launch {

            if (product.id != 0) {
                productRepository.updateProduct(product)
            } else {
                //products max id
                val id = products.value.maxOfOrNull { it.id }

                val newProduct = product.copy(id = id?.plus(1) ?: 1)
                productRepository.addProduct(newProduct)
            }

            setProduct(ProductInput(0, "", ""))

        }

    }

    override val product: StateFlow<ProductInput> = productRepository.product

    override fun setProduct(product: ProductInput) {
        launch {
            productRepository.setProduct(product)
        }
    }

    //    override val filterProduct = products.combine(_filterStr) { products, filterStr ->
//        products.filter {
//            it.name.contains(filterStr)
//        }
//    }.stateIn(this, SharingStarted.WhileSubscribed(), emptyList())

    private val _filterProduct = MutableStateFlow<List<Product>>(emptyList())
    override val filterProduct = _filterProduct.asStateFlow()

    init {
        changeProductsAndFilterStrToFilterProduct()
    }

    /**
     * products 와 filterStr 이 바뀌면 filterProduct 을 갱신 한다.
     */
    private fun changeProductsAndFilterStrToFilterProduct() {
        launch {
            products.combine(_filterStr) { products, filterStr ->
                products.filter {
                    it.name.contains(filterStr)
                }
            }.distinctUntilChanged().collect {
                _filterProduct.value = it
            }
        }
    }
}