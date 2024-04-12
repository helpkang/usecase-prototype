package com.usecase.product

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication(scanBasePackages = ["com.usecase.product"])
class ProductApplication

fun main(args: Array<String>) {
	runApplication<ProductApplication>(*args)
}