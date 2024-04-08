//
//  ContentView.swift
//  ios
//
//  Created by ksi on 4/4/24.
//

import Combine
import SwiftUI

struct ContentContainer: View {
    @ObservedObject var productUseCase: ProductUseCaseImpl = ProductUseCaseImpl(
        productRepository: MemoryProductRepository())
    
    var body: some View {
        VStack {
            SearchView(filterStr: $productUseCase.filterStr)
            
            InputView(productInputState: productUseCase.productInputState, addProduct: productUseCase.addProduct)

            ListView(products: $productUseCase.filteredProducts, setProduct: productUseCase.productInputState.setProduct)
            
        }
    }
}



#Preview {
    ContentContainer()
}

