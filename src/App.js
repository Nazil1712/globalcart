import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Cart from "./features/cart/Cart";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { useEffect } from "react";
import PageNotFound from "./pages/PageNotFound";
import OrderSuccess from "./pages/OrderSuccess";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/home",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
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
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailsPage />
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccess />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const items = useSelector((state)=>state.cart.items)

  useEffect(() => {
    if (loggedInUser) {
      dispatch(fetchItemsByUserIdAsync(loggedInUser.id));
    }
  }, [dispatch, loggedInUser, items]);

  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
