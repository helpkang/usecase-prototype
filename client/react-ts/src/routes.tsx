// routes.ts
import Home from "./samples/Home";
import About from "./samples/About"; // Import the 'About' component
import Users from "./samples/Users";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/about", element: <About /> },
      { path: "/users", element: <Users /> },
      { path: "*", element: <div>Not Found</div>},
    ],
  },
]);

export default routes;
