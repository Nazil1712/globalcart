import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { deleteFromCartAsync, updateCartAsync } from "./cartSlice";
import { discountedPrice } from "../../app/constants";
import PopupBox from "../common/Dialog";
import emptyCartUpper from "../../images/empty_cart_upper.png";

export default function Cart() {
  const [showPopUp, setShowPopUp] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.items);

  // console.log(products)
  const totalAmount = products.reduce(
    (prevAmount, item) =>
      item.quantity *
        discountedPrice(
          item.product.price   ,
          item.product.discountPercentage
        ) +
      prevAmount,
    0
  );
  const totalItems = products.reduce(
    (prevCount, item) => item.quantity + prevCount,
    0
  );

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleDelete = (id) => {
    dispatch(deleteFromCartAsync(id));
  };

  return (
    <>
      {/* {!products.length && <Navigate to={"/"} />} */}

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">
            Cart
          </h1>
        </div>
      </header>

      {products.length === 0 ? (
        <div className="mx-auto  bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flow-root">
              <img
                src={emptyCartUpper}
                alt="empty_cart_img"
                className="mx-auto"
              />
              <p className="text-red-800 text-center text-5xl font-extrabold">
                Oops!
              </p>
              <p className="text-yellow-600 text-center text-6xl mt-6">
                Your Cart Is Empty
              </p>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  <Link to={"/"}>
                    <button
                      type="button"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.product.thumbnail}
                        alt={product.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.product.href}>
                              {product.product.title}
                            </a>
                          </h3>
                          <p className="ml-4">
                            ₹{" "}
                            {discountedPrice(
                              product.product.price   ,
                              product.product.discountPercentage
                            )}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          Qty
                          <select
                            className="ml-2 h-10"
                            onChange={(e) => handleQuantity(e, product)}
                            value={product.quantity}
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                          </select>
                        </div>

                        <div className="flex">
                          <PopupBox
                            title={`Remove ${product.product.title} ?`}
                            message={`Do you really Want to remove this Item from Cart ? After Deleting You won't be able to see this item in cart !`}
                            dangerOption={"Remove"}
                            cancelOption={"Cancel"}
                            dangerAction={() => handleDelete(product.id)}
                            cancleAction={() => setShowPopUp(-1)}
                            showPopUp={showPopUp === product.id}
                          />

                          <button
                            onClick={() => setShowPopUp(product.id)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900 border-b py-3">
              <p>Total Items in Cart</p>
              <p>{totalItems} Items</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900  mt-3">
              <p>Subtotal</p>
              <p>₹ {totalAmount}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <Link to={"/"}>
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
