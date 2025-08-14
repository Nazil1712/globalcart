import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetCurrentOrder } from "../features/order/orderSlice";
import orderSucess from "../images/order_sucess.png";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";

function OrderSuccess() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear Cart
    dispatch(resetCartAsync());

    // Clear Order
    dispatch(resetCurrentOrder());
  }, [dispatch]);

  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <ShoppingCartIcon className="text-blue-600 w-72" />
        <div className="text-center">
          <h1 className="text-3xl mt-5 font-bold tracking-tight text-blue-600 sm:text-5xl">
            Order Successfully placed !
          </h1>
          <p className="text-base mt-4 font-semibold text-black-900">
            Order Number # {id}
          </p>
          <p className="mt-6 text-base leading-7 text-gray-600">
            You can check your order in My Account {">"} My orders
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={"/"}
              className="rounded-md bg-gradient-to-br from-cyan-500 to-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gradient-to-l focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <Link
              to={"/orders"}
              className="rounded-md bg-gradient-to-br from-cyan-500 to-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gradient-to-r focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Checkout Your Orders
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderSuccess;
