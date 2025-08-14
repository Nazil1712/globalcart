import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetCurrentOrder } from "../features/order/orderSlice";
import orderSucess from "../images/order_sucess.png";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/16/solid";

function ResetPasswordSuccess() {
  const { id } = useParams();
  const dispatch = useDispatch();

  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <KeyIcon className="text-blue-600 w-80" />
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-blue-600 sm:text-5xl">
            Your password has been reset successfully
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
          Please try logging in with your new password
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={"/login"}
              className="rounded-md bg-gradient-to-br from-cyan-500 to-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gradient-to-l focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login Page
            </Link>
            <Link
              to={"/signup"}
              className="rounded-md bg-gradient-to-bl from-cyan-500 to-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gradient-to-r focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up page
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default ResetPasswordSuccess;
