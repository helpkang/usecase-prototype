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
    
    @ObservedObject var productInputState = ProductInputState()
    
    
    var body: some View {
        VStack {
            SearchView(filterStr: $productUseCase.filterStr)
            
            InputView(productInputState: productInputState, addProduct: productUseCase.addProduct)
            
            // list of products
            List($productUseCase.filteredProducts.projectedValue, id: \.id) { product in
                
                HStack {
                    Text(product.name.wrappedValue)
                    Text(String(product.price.wrappedValue))
                    Button("Edit") {
                        productInputState.setProduct(
                            productInput: ProductInput(
                                id: product.id.wrappedValue, name: product.name.wrappedValue,
                                price: String(product.price.wrappedValue))
                        )
                    }
                }
            }
            
        }
    }
}



#Preview {
    ContentContainer()
}

struct SearchView: View {

    @Binding var filterStr: String

    var body: some View {
        VStack{
            Text("filter: \(filterStr)")
            TextField(
                "Search", text: $filterStr
            )
        }
    }
}

struct InputView: View {
    
    @ObservedObject var productInputState: ProductInputState
    
    var addProduct: (_ product: Product)->Void
    
    
    var body: some View {
        VStack{
            TextField("Name", text: $productInputState.product.name)
            
            TextField("Price", text: $productInputState.product.price)
            
                        Button(action: {
                            if let priceAsDouble = Double(productInputState.product.price) {
                                addProduct(
                                    Product(
                                        id: productInputState.product.id, name: productInputState.product.name, price: priceAsDouble
                                    ))
                                productInputState.setProduct(productInput: ProductInput(id: 0, name: "", price: ""))
                            } else {
                                print("Invalid price input")
                            }
                        }) {if productInputState.product.id == 0 {
                            Text("ADD")
                        }  else {
                            Text("UPDATE")
                        }
                        }
        }
    }
}

//struct SearchView: View {
//  @State private var searchText = ""
//  var setFilterStr: (String) -> Void
//
//    init(setFilterStr: @escaping (String) -> Void) {
//        self.setFilterStr = setFilterStr
//    }
//
//  var body: some View {
//    VStack {
//    Text("value"+searchText)
//      TextField(
//        "Search", text: $searchText,
//        onCommit: {
//          setFilterStr(searchText)
//        })
//    }.padding()
//  }
//}

//struct ProductInputView: View {
//  var setProduct: (ProductInput) -> Void
//  var addProduct: (Product) -> Void
// @State var product: ProductInput
//
//  init(
//    product: ProductInput, setProduct: @escaping (ProductInput) -> Void,
//    addProduct: @escaping (Product) -> Void
//  ) {
//
//    self.setProduct = setProduct
//    self.addProduct = addProduct
//    self.product = product
//  }
//
//  var body: some View {
//    VStack {
//      // input fields name, pirce
//      TextField("Name", text: $product.name)
//      TextField("Price", text: $product.price)
//      Button("Add") {
//        if let priceAsDouble = Double(product.price) {
//          addProduct(Product(id: product.id, name: product.name, price: priceAsDouble))
//          setProduct(ProductInput(id: 0, name: "", price: ""))
//        } else {
//          print("Invalid price input")
//        }
//      }
//    }.padding()
//  }
//}

//struct ProductionsListView: View {
//    @State private var products: [Product]
//    var setProduct: (ProductInput) -> Void
//    init(products: [Product], setProduct: @escaping (ProductInput) -> Void) {
//        self.products = products
//        self.setProduct = setProduct
//        print("products list vie: \(products.count)")
//    }
//
//    var body: some View {
//        VStack {
//            // list of products
//            List(products, id: \.id) { product in
//
//                HStack {
//                    Text(product.name)
//                    Text(String(product.price))
//                    Button("Edit") {
//                        setProduct(ProductInput(id: product.id, name: product.name, price: String(product.price)))
//                    }
//                }
//            }.padding()
//        }
//    }
//}
