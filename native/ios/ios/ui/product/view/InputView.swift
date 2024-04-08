//
//  InputView.swift
//  ios
//
//  Created by ksi on 4/8/24.
//

import Foundation
import SwiftUI




struct InputView: View {
    
    @ObservedObject var productInputState: ProductInputState
    
    var addProduct: ()->Void
    
    
    var body: some View {
        VStack{
            TextField("Name", text: $productInputState.product.name)
            
            TextField("Price", text: $productInputState.product.price)
            
            Button(action: {
                addProduct()
            }) {if productInputState.product.id == 0 {
                Text("ADD")
            }  else {
                Text("UPDATE")
            }
            }
        }
    }
}
