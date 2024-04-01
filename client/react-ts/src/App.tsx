import React from "react";
import routes from "./routes";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const App = () => (
  <React.Suspense fallback={<Loding />}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </React.Suspense>
);

export default App;

function Loding() {
  return <div>loading...</div>;
}
