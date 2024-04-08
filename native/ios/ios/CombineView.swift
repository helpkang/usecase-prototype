//
//  CombineView.swift
//  ios
//
//  Created by ksi on 4/6/24.
//

import SwiftUI

struct Prod {
    var name = ""
    var price = ""
}
class CombineRepo2: ObservableObject {
    @Published var prod = Prod(name:"", price: "")
}
class CombineRepo: ObservableObject {
    @Published var name = "a"
    @Published var price = ""
}

struct CombineView2: View {
    @ObservedObject var combineRepo = CombineRepo2()
    
    var body: some View {
        VStack(){
//            HStack(){
//                Text(combineRepo.prod.name)
//                Text(":")
//                Text(combineRepo.prod.price)
//            }
//            HStack(){
//                TextField("name", text: $combineRepo.prod.name)
//            }
            Render(name: $combineRepo.prod.name)
               
        }
    }
}

struct Render: View {
    var name: Binding<String>;
    
    init(name: Binding<String>) {
        self.name = name
    }
    
    var body: some View {
        VStack(){
            HStack(){
                Text(name.wrappedValue)
//                Text(":")
//                Text(combineRepo.prod.price)
            }
            HStack(){
                TextField("name", text: name)
            }
        }
    }
}


struct CombineView: View {
    @ObservedObject var combineRepo = CombineRepo()
    
    var body: some View {
        VStack(){
            HStack(){
                Text(combineRepo.name)
                Text(":")
                Text(combineRepo.price)
            }
            HStack(){
                TextField("name", text: $combineRepo.name)
            }
        }
    }
}

#Preview {
    CombineView()
}
