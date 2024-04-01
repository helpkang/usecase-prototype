// routes.ts
import ProductApiContainer from "./page/product/ProductApiContainer";
import ProductLocalContainer from "./page/product/ProductLocalContainer";
import Home from "./samples/Home";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {path: "product-local", element: <ProductLocalContainer/>},
      {path: "product-api", element: <ProductApiContainer/>},
      { path: "*", element: <div>Not Found</div>},
    ],
  },
]);

export default routes;
