import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css"
import { routes } from "./router";
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const router = createBrowserRouter([...routes]);

  return (
    <main className="leading-normal">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      
      />
      <RouterProvider router={router} />
    </main>
  )
}

export default App