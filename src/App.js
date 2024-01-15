import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./App.css";
import ProductList from "./features/product-list/ProductList";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Cart from "./features/cart/Cart";
import CartPage from "./pages/CartPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Home></Home>
      </>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: '/cart',
    element: <CartPage/>
  }
]);

function App() {
  // return (
  //   <div className="App">
  //     {/* <LoginPage/> */}
  //     <SignUpPage/>
  //     {/* <Home></Home> */}
  //   </div>
  // );

  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
