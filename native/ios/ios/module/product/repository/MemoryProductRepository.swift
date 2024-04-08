//
//  MemoryProductRepository.swift
//  swift-usecase-test
//
//  Created by ksi on 3/28/24.
//

import Foundation
import Combine

class MemoryProductRepository: ProductRepository {
    
    @Published var products: [Product] = []
    var productsPub: Published<[Product]>.Publisher {
        $products
    }


    func addProduct(product: Product) {
        products.append(product)
    }
    
    func updateProduct(product: Product) {
        products = products.map { $0.id == product.id ? product : $0 }   
    }
    
}
