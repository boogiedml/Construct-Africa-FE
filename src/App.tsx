import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css"
import { routes } from "./router";

const App = () => {
  const router = createBrowserRouter([...routes]);

  return (
    <main className="leading-normal">
      <RouterProvider router={router} />
    </main>
  )
}

export default App