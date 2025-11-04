import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css"
import { routes } from "./router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const router = createBrowserRouter([...routes]);

  return (
    <main className="leading-normal">
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router} />
    </main>
  )
}

export default App