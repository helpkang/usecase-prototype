//
//  SearchView.swift
//  ios
//
//  Created by ksi on 4/8/24.
//

import Foundation
import SwiftUI


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

