package com.usecase

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.usecase.modules.model.Product
import com.usecase.modules.repository.MemoryProductRepository
import com.usecase.ui.product.ProductInput
import com.usecase.ui.product.ProductionsList
import com.usecase.ui.product.Search
import com.usecase.ui.theme.AndroidUseCaseTheme
import com.usecase.modules.usecase.ProductUseCase
import com.usecase.modules.usecase.ProductUseCaseImpl

class MainActivity : ComponentActivity() {
    private var id = 0
    private val productUseCase: ProductUseCase = ProductUseCaseImpl(MemoryProductRepository())

    private fun onClick() {
        val product = Product(++id, "Product1111", 30.0)
        productUseCase.addProduct(product)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val setFilterStr = productUseCase::setFilterStr
        val filterProduct = productUseCase.filterProduct
//        val products = productUseCase.products
        val addProduct = productUseCase::addProduct
        val product = productUseCase.product
        val setProduct = productUseCase::setProduct

        setContent {
            AndroidUseCaseTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    Column {
                        Button(
                            onClick = { onClick() }, modifier = Modifier
                                .width(200.dp)
                                .height(50.dp)
                        ) {
                            Text("Add Product")
                        }

                        Search(setFilterStr = setFilterStr)

                        ProductInput(product = product, setProduct = setProduct, addProduct = addProduct)

                        ProductionsList(products = filterProduct, setProduct = setProduct)
                    }
                }
            }
        }
    }
}

//    @Composable
//    fun Greeting(name: String, modifier: Modifier = Modifier) {
//        Text(
//            text = "Hello $name!",
//            modifier = modifier
//        )
//    }
//
//    @Preview(showBackground = true)
//    @Composable
//    fun GreetingPreview() {
//        AndroidUseCaseTheme {
//            Greeting("Android")
//        }
//    }