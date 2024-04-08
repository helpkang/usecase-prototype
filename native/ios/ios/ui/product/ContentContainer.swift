//
//  ContentView.swift
//  ios
//
//  Created by ksi on 4/4/24.
//

import Combine
import SwiftUI

struct ContentView: View {
    @ObservedObject var productUseCase: ProductUseCaseImpl = ProductUseCaseImpl(
        productRepository: MemoryProductRepository())
    
    @ObservedObject var productInputState = ProductInputState()
    
    //  func setFilterStr(filterStr: String) {
    //    productUseCase.setFilterStr(filterStr: filterStr)
    //  }
    //
    func setProduct(product: ProductInput) {
        productInputState.setProduct(productInput: product)
    }
    
    //  func addProduct(product: Product) {
    //    productUseCase.addProduct(product: product)
    //  }
    
    //    @State var productInput:ProductInput = ProductInput(id: 0, name: "", price: "")
    
    var body: some View {
        VStack {
            //      SearchView(setFilterStr: setFilterStr)
            //      ProductInputView(
            ////        product: productUseCase.product, setProduct: setProduct, addProduct: addProduct)
            //        )
            //        ProductionsListView(products: productUseCase.products, setProduct: setProduct)
            TextField("Name", text: $productInputState.product.name)
            //                .onChange(
            //                of: productUseCase.product.name
            //            )
            //            { oldValue, newValue in
            //                setProduct(
            //                    product: ProductInput(
            //                        id: productInputRepo.product.id, name: newValue, price: productInputRepo.product.price))
            //            }
            TextField("Price", text: $productInputState.product.price)
            //                .onChange(
            //                of: productInputRepo.product.price
            //            )
            //            { oldValue, newValue in
            //                setProduct(
            //                    product: ProductInput(
            //                        id: productInputRepo.product.id, name: productInputRepo.product.name, price: newValue))
            //            }
            //        Button(action: "Add") {
            Button(action: {
                if let priceAsDouble = Double(productInputState.product.price) {
                    productUseCase.addProduct(
                        product: Product(
                            id: productInputState.product.id, name: productInputState.product.name, price: priceAsDouble
                        ))
                    setProduct(product: ProductInput(id: 0, name: "", price: ""))
                } else {
                    print("Invalid price input")
                }
            }) {if productInputState.product.id == 0 {
                Text("ADD")
            }  else {
                Text("UPDATE")
            }
                
            }
            // list of products
            List($productUseCase.products.projectedValue, id: \.id) { product in
                
                HStack {
                    Text(product.name.wrappedValue)
                    Text(String(product.price.wrappedValue))
                    Button("Edit") {
                        setProduct(
                            product: ProductInput(
                                id: product.id.wrappedValue, name: product.name.wrappedValue,
                                price: String(product.price.wrappedValue))
                        )
                    }
                }
            }.padding()
            
        }
        .padding()
    }
}

#Preview {
    ContentView()
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
