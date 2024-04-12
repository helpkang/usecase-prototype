package com.useacae.product.entity

import org.springframework.data.jpa.repository.JpaRepository

interface ProductEntityRepository : JpaRepository<ProductEntity, Long>