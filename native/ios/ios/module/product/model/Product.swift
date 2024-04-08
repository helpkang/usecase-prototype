//
//  Product.swift
//  swift-usecase-test
//
//  Created by ksi on 3/28/24.
//

import Foundation
import Combine

class Product {
    @Published var id: Int
    @Published var name: String
    @Published var price: Double
    
    init(id: Int, name: String, price: Double) {
        self.id = id
        self.name = name
        self.price = price
    }
}

extension Product: Equatable {
    static func == (lbs: Product, rhs: Product) -> Bool {
        return lbs.id == rhs.id && lbs.name == rhs.name && lbs.price == rhs.price
    }
}

