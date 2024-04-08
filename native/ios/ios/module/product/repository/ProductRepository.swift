//
//  ProductRepository.swift
//  swift-usecase-test
//
//  Created by ksi on 3/28/24.
//

import Foundation
import Combine

protocol ProductRepository {
    var products: [Product] { get }
    
    var productsPub: Published<[Product]>.Publisher { get }

    func addProduct(product: Product)
    
    func updateProduct(product: Product)
    
}
