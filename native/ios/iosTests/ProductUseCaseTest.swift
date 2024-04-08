//
//  ProductUseCaseTest.swift
//  swift-usecase-testTests
//
//  Created by ksi on 3/28/24.
//

import XCTest

@testable import ios

final class ProductUseCaseTest: XCTestCase {
    
    var productUseCase: ProductUseCase!
    
    override func setUp() {
        super.setUp()
        productUseCase = ProductUseCaseImpl(productRepository: MemoryProductRepository())
    }
    
    override func tearDown() {
        productUseCase = nil
        super.tearDown()
    }
    
    func testAddProduct() {
        let productInput = ProductInput(id: 0, name: "Test Product", price: "10.0")
        productUseCase.productInputState.setProduct(productInput: productInput)
        productUseCase.addProduct()
        //TODO: 배열에 직접 넣는 경우 막을 방법이 없는 건지
        //productUseCase.products.append(Product(id: 10, name: "test", price: 10.0))
        XCTAssertEqual(productUseCase.products.count, 1)
//        print("product0")
////        print(productUseCase.products[0])
//        print(productUseCase.products.count)
//        XCTAssertEqual(product, productUseCase.products[0])
        
    }
    
    func testUpdateProduct() {
        let productInput = ProductInput(id: 0, name: "Test Product", price: "10.0")
        productUseCase.productInputState.setProduct(productInput: productInput)
        productUseCase.addProduct()
        //TODO: 배열에 직접 넣는 경우 막을 방법이 없는 건지
        var addedProduct = ProductInput(id: 1, name: "Test Product", price: "10.0")
        XCTAssertEqual(productUseCase.products.count, 1)
        XCTAssertEqual(productUseCase.products[0], Product(id: addedProduct.id, name: addedProduct.name, price: Double(addedProduct.price) ?? 0.0))
        
        addedProduct = ProductInput(id: 1, name: "Test Product", price: "10.0")
        productUseCase.productInputState.setProduct(productInput: addedProduct)

        
        productUseCase.addProduct()
        XCTAssertEqual(productUseCase.products[0], Product(id: addedProduct.id, name: addedProduct.name, price: Double(addedProduct.price) ?? 0.0))
        
    }
    
    
    func testSetFilterStr() {
        let filterStr = "Test"
        productUseCase.setFilterStr(filterStr: filterStr)
        // Add more assertions here based on your filter logic
    }
    
    func testFilteredProducts() {
        
        // Add multiple products
        let product1 = ProductInput(id: 0, name: "Test Product 1", price: "10.0")
        let product2 = ProductInput(id: 0, name: "Test Product 2", price: "20.0")
        let product3 = ProductInput(id: 0, name: "Another Product", price: "30.0")
        productUseCase.productInputState.setProduct(productInput: product1)
        productUseCase.addProduct()
        productUseCase.productInputState.setProduct(productInput: product2)
        productUseCase.addProduct()
        productUseCase.productInputState.setProduct(productInput: product3)
        productUseCase.addProduct()
        XCTAssertEqual(productUseCase.products.count, 3)
        
        let filterStr = "Test"
        productUseCase.setFilterStr(filterStr: filterStr)
        //    sleep(3)
        // Check if the filteredProducts only contain the products with "Test" in their name
        let filteredProducts = productUseCase.filteredProducts
        XCTAssertEqual(filteredProducts.count, 2)
        for product in filteredProducts {
            XCTAssertTrue(product.name.contains(filterStr))
        }
    }
}
