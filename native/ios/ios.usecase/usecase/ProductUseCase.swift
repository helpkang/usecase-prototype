//
//  ProductUseCase.swift
//  swift-usecase-test
//
//  Created by ksi on 3/28/24.
//

import Foundation
import Combine

protocol ProductUseCase {
    var products: [Product] { get }
    func addProduct(product: Product)
    func setFilterStr(filterStr: String)
    var filteredProducts: [Product] { get }
}