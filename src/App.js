import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./App.css";
import ProductList from "./features/product-list/components/ProductList";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Cart from "./features/cart/Cart";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProdctDetails from "./features/product-list/components/ProductDetails";
import ProductDetailsPage from "./pages/ProductDetailsPage";

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
  },
  {
    path:'/checkout',
    element:<Checkout/>
  },
  {
    path: '/product-detail',
    element:<ProductDetailsPage/>
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
