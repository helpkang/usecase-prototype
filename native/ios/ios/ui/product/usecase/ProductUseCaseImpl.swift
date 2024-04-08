//
//  ProductUseCaseImpl.swift
//  swift-usecase-test
//
//  Created by ksi on 3/28/24.
//

import Combine
import Foundation

class ProductUseCaseImpl: ProductUseCase, ObservableObject {

  @Published var products: [Product]

  @Published var filteredProducts: [Product] = []

  private var productRepository: ProductRepository

  @Published var filterStr: String = "a"

  private var cancelAble: AnyCancellable? = nil

  init(productRepository: ProductRepository) {
    self.productRepository = productRepository
    self.products = self.productRepository.products

    self.cancelAble =
      productRepository.productsPub
      .combineLatest($filterStr)
      .map { products, filterStr in
        print("products: \(products.count)")
        self.products = products
        return products.filter { product in
          filterStr.isEmpty || product.name.contains(filterStr)
        }
      }.assign(to: \.filteredProducts, on: self)
  }

  func addProduct(product: Product) {
    if product.id != 0 {
      productRepository.updateProduct(product: product)
    } else {
      //products max id
      let id = products.map { product in product.id }.max() ?? 0
        
        print("max")
        print(id)

      //new product with id +1
      let newProduct = Product(id: id + 1, name: product.name, price: product.price)
        productRepository.addProduct(product: newProduct)
    }
  }

  func setFilterStr(filterStr: String) {
    self.filterStr = filterStr
  }

}
