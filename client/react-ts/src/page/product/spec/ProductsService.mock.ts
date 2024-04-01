import sinon from "ts-sinon";
import {
  CancelablePromise,
  ProductCIVO,
  ProductsService,
} from "../../../gen/api";
import { Product } from "../../../share/repository/product/Product";
// import { useProductsRepo } from "../../../../share/repository/product/useProductsRepo";
// const barrier = { init: 0 };
export function userProductServiceMock() {
  // barrier.init++;
  // console.log("barrier.init###", barrier.init)
  // if (barrier.init !== 1) {
  //   return;
  // }

  const products: Product[] = [];

  function addProductOrUpdate(product: Product) {
    const index = products.findIndex((p) => p.id === product.id);
    if (index === -1) {
      products.push(product);
    } else {
      products[index] = product;
    }
  }

  function removeProduct(id: number) {
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products.splice(index, 1);
    }
  }
  
  // console.log("userProductServiceMock###");
  // console.log(new Error("userProductServiceMock###").stack)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { products, addProductOrUpdate, removeProduct } = useProductsRepo();
  sinon
    .stub(ProductsService, "getAllProducts")
    .callsFake(getAllProducts(products));

  sinon
    .stub(ProductsService, "createProduct")
    .callsFake((product: ProductCIVO) => {
      return new CancelablePromise((resolve) => {
        const newProduct = {
          ...product,
        } as Product;
        addProductOrUpdate(newProduct);
        resolve(newProduct);
      });
    });

  sinon.stub(ProductsService, "deleteProduct").callsFake((id: number) => {
    return new CancelablePromise((resolve) => {
      removeProduct(id);
      resolve(true);
    });
  });

  sinon
    .stub(ProductsService, "updateProduct")
    .callsFake((id: number, product: ProductCIVO) => {
      return new CancelablePromise((resolve) => {
        const newProduct = {
          ...product,
          id,
        } as Product;
        addProductOrUpdate(newProduct);
        resolve(newProduct);
      });
    });

  sinon
    .stub(ProductsService, "searchProductByNameAndPrice")
    .callsFake((name?: string, price?: number) => {
      return new CancelablePromise((resolve) => {
        resolve(products.filter((product) => name?.length ===0 || product.name === name).filter((product) => price === 0 || product.price === price));
      });
    });
}

type RegisterRepositoryReturn = ReturnType<
  typeof ProductsService.getAllProducts
>;

function getAllProducts(products: Product[]): () => RegisterRepositoryReturn {
  return (): RegisterRepositoryReturn => {
    return new CancelablePromise((resolve) => {
      resolve(products);
    });
  };
}
