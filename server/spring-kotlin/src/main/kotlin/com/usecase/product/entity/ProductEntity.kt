package com.usecase.product.entity

// jpa product entity
import javax.persistence.Entity
import javax.persistence.GeneratedValue

@Entity
data class ProductEntity(
    @GeneratedValue
    val id: Long,
    val name: String,
    val price: Double
) {
    constructor(name: String, price: Double) : this(0, name, price)
}