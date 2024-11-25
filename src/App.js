import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Cart from "./features/cart/Cart";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Productdetailspage from "./pages/Productdetailspage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartByUserAsync } from "./features/cart/cartslice";
import { useEffect } from "react";
import PageNotFound from "./pages/PageNotFound";
import OrderSuccess from "./pages/OrderSuccess";
import UserordersPage from "./pages/UserOrdersPage";
import UserprofilePage from "./pages/UserProfilePage";
import Logout from "./features/auth/components/Logout";
import Forgotpassword from "./features/auth/components/Forgotpassowrd";
import Protectedadmin from "./features/auth/components/Protectedadmin";
import Adminhome from "./pages/admin/Adminhome";
import Adminproductdetailspage from "./pages/admin/Adminproductdetailspage";
import Productform from "./features/admin/components/Productform";
import Productformpage from "./pages/admin/Productformpage";
import Adminorderspage from "./pages/admin/Adminorderspage";
import { render } from "react-dom";
import ProductListShimmerPage from "./pages/shimmer/ProductListShimmerPage";
import ProductdetailShimmer from "./features/shimmer/ProductdetailShimmer";
import { fetchloggedInUserAsync } from "./features/user/userslice";
import { checkAuthAsync } from "../src/features/auth/authslice";
import StripeCheckout from "./pages/StripeCheckout";

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
    path: "/admin",
    element: (
      <Protectedadmin>
        <Adminhome></Adminhome>
      </Protectedadmin>
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
        <Productdetailspage />
      </Protected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <Protectedadmin>
        <Adminproductdetailspage />
      </Protectedadmin>
    ),
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccess />,
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserordersPage />
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserprofilePage />
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/forgot-password",
    element: <Forgotpassword />,
  },
  {
    path: "/admin/product-form",
    element: (
      <Protectedadmin>
        <Productformpage />
      </Protectedadmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <Protectedadmin>
        <Productformpage />
      </Protectedadmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <Protectedadmin>
        <Adminorderspage />
      </Protectedadmin>
    ),
  },
  {
    path: "/stripe-checkout",
    element: (
      <Protected>
        <StripeCheckout/>
      </Protected>
    ),
  },

  {
    path: "/product-list-shimmer",
    element: <ProductListShimmerPage />,
  },
  {
    path: "/shimmer",
    element: <ProductdetailShimmer />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const loggedInUserToken = useSelector(
    (state) => state.auth.loggedInUserToken
  );
  const items = useSelector((state) => state.cart.items);
  const orders = useSelector((state) => state.order.orders);
  const userChecked = useSelector((state) => state.auth.userChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  // console.log("loggedInUserToken",loggedInUserToken)

  useEffect(() => {
    if (loggedInUserToken) {
      dispatch(fetchCartByUserAsync());
      dispatch(fetchloggedInUserAsync());
    }
  }, [dispatch, loggedInUserToken, items.length, orders.length]);

  return (
    <div className="App">
      {userChecked && <RouterProvider router={appRouter} />}
    </div>
  );
}

export default App;
