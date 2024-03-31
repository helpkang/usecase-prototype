// routes.ts
import ProductLocalContainer from "./page/product/api/ProductLocalContainer";
import Home from "./samples/Home";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {path: "product-local", element: <ProductLocalContainer/>},
      { path: "*", element: <div>Not Found</div>},
    ],
  },
]);

export default routes;
