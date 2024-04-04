//
//  Calcurator.swift
//  ios.usecase
//
//  Created by ksi on 4/4/24.
//

import Foundation

public class Calcurator {
    public init() {
    }
    
    public func add(_ a: Int, _ b: Int) -> Int {
        return a + b
    }
    
    public func sub(_ a: Int, _ b: Int) -> Int {
        return a - b
    }
    
    public func mul(_ a: Int, _ b: Int) -> Int {
        return a * b
    }
    
    public func div(_ a: Int, _ b: Int) -> Int {
        return a / b
    }
}