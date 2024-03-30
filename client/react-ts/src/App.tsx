import React from "react";
import routes from "./routes";
import { RouterProvider } from "react-router-dom";

const App = () => (
  <React.Suspense fallback={<Loding />}>
    <RouterProvider router={routes} />
  </React.Suspense>
);

export default App;

function Loding() {
  return <div>loading...</div>;
}
