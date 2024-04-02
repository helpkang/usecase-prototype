package com.usecase.modules.model
data class Product(val id: Int, val name: String, val price: Double)

data class ProductInput(val id: Int, val name: String, val price: String)