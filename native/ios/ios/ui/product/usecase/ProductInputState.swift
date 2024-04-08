//
//  ProductInputRepo.swift
//  ios
//
//  Created by ksi on 4/8/24.
//

import Foundation

class ProductInputState: ObservableObject{
    @Published var product: ProductInput = ProductInput(id: 0, name: "", price: "")
    
    func setProduct(productInput: ProductInput) {
        product = productInput
    }
}
