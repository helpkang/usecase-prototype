//
//  ProductUseCaseImpl.swift
//  swift-usecase-test
//
//  Created by ksi on 3/28/24.
//

import Combine
import Foundation

class ProductUseCaseImpl: ProductUseCase {

  @Published var products: [Product]

  @Published var filteredProducts: [Product] = []

  private var productRepository: ProductRepository

  @Published var filterStr: String = ""

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
    productRepository.addProduct(product: product)
  }

  func setFilterStr(filterStr: String) {
    self.filterStr = filterStr
  }

}
