package com.usecase.ui.product

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import com.usecase.modules.model.Product
import com.usecase.modules.model.ProductInput
import kotlinx.coroutines.flow.StateFlow

@Composable
fun ProductInput(
    product: StateFlow<ProductInput>,
    setProduct: ProductInput.() -> Unit,
    addProduct: (product: Product) -> Unit
) {
    val productState by product.collectAsState()

    println("ProductInput: $productState")
    Column {
        Row {
            TextField(
                value = productState.name,
                onValueChange = { newValue ->
                    setProduct(productState.copy(name = newValue))
                },
                label = { Text("name") },
                keyboardOptions = KeyboardOptions(
                    keyboardType = KeyboardType.Text,
                    imeAction = ImeAction.Done
                ),
            )

            TextField(
                value = productState.price,
                onValueChange = { newValue ->
                    setProduct(productState.copy(price = newValue))
                },
                label = { Text("price") },
                keyboardOptions = KeyboardOptions(
                    keyboardType = KeyboardType.Text,
                    imeAction = ImeAction.Done
                ),
            )
        }

        Button(onClick = {
            addProduct(
                Product(
                    productState.id,
                    productState.name,
//                    productState.price.toDoubleOrNull() ?: 0.0
                    3.0
                )

            )
        }) {
            Text(if (productState.id==0) "Add" else "Update")
        }
    }
}

