package com.usecase.ui.product

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import com.usecase.modules.model.Product
import com.usecase.modules.model.ProductInput
import kotlinx.coroutines.flow.StateFlow

@Composable
fun ProductionsList(products: StateFlow<List<Product>>, setProduct: (ProductInput) -> Unit) {
    val productList by products.collectAsState()

    LazyColumn {
        items(productList) { product ->
            Row {
                Text(text = product.name)
                Text(text = product.price.toString())
                Button(onClick = {
                    setProduct(
                        ProductInput(
                            product.id,
                            product.name,
                            product.price.toString()
                        )
                    )
                }) {
                    Text("Edit")
                }
            }
        }
    }
}