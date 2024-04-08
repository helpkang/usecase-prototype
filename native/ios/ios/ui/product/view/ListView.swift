//
//  ListView.swift
//  ios
//
//  Created by ksi on 4/8/24.
//

import Foundation
import SwiftUI

struct ListView: View {
    @Binding var products: [Product]
    
    var setProduct: (_ productInput: ProductInput) -> Void
    
    var body: some View {
        List($products.projectedValue, id: \.id) { product in
            
            HStack {
                Text(product.name.wrappedValue)
                Text(String(product.price.wrappedValue))
                Button("Edit") {
                    setProduct(
                        ProductInput(
                            id: product.id.wrappedValue, name: product.name.wrappedValue,
                            price: String(product.price.wrappedValue))
                    )
                }
            }
        }
    }
}
