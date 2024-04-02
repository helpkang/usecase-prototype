package com.usecase.ui.product

import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
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
import kotlinx.coroutines.flow.StateFlow

@Composable
fun Search(setFilterStr: (String) -> Unit) {
    val text = remember { mutableStateOf("") }

    TextField(
        value = text.value,
        onValueChange = { newValue ->
            text.value = newValue
            setFilterStr(newValue)
        },
        label = { Text("Search") },
        keyboardOptions = KeyboardOptions(
            keyboardType = KeyboardType.Text,
            imeAction = ImeAction.Done
        ),
        keyboardActions = KeyboardActions(onDone = {
            setFilterStr(text.value)
        })
    )
}

