package com.usecase.product.entity

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ProductEntityRepository : JpaRepository<ProductEntity, Long>