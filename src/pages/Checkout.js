import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  deleteFromCartAsync,
  updateCartAsync,
} from "../features/cart/cartslice";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createOrderAsync } from "../features/order/orderslice";
import { discountedPrice } from "../app/constants";
import PopupBox from "../features/common/Dialog";
import { updateUserAsync } from "../features/user/userslice";

export default function Checkout() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [showPopUp, setShowPopUp] = useState(null);

  const items = useSelector((state) => state.cart.items);
  const userInfo = useSelector((state) => state.user.userInfo);
  const currentOrder = useSelector((state) => state.order.currentOrder);
  const addresses = userInfo.addresses;
  console.log(addresses);
  const [selectedAddress, setSelectedAdddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const totalAmount = items.reduce(
    (prevAmount, item) =>
      item.quantity *
        discountedPrice(item.product.price, item.product.discountPercentage) +
      prevAmount,
    0
  );

  const totalItems = items.reduce(
    (prevCount, item) => item.quantity + prevCount,
    0
  );

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleDelete = (id) => {
    dispatch(deleteFromCartAsync(id));
  };

  const handleAddress = (e, index) => {
    setSelectedAdddress(addresses[index]);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.id);
  };

  const handleOrder = () => {
    const order = {
      items,
      totalAmount,
      totalItems,
      user:userInfo.id,
      paymentMethod,
      selectedAddress,
      status: "pending", // Other status can be => delivered, dispathced, received etc.
    };
    dispatch(createOrderAsync(order));
  };

  return (
    <>
      {!items.length && <Navigate to={"/"} />}
      {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} />}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <form
              className="bg-white px-4 mt-12"
              onSubmit={handleSubmit((data) => {
                dispatch(
                  updateUserAsync({
                    ...userInfo,
                    addresses: addresses? [...addresses, data] : data,
                  })
                );
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12 pt-6">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                    Personal Information
                  </h1>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "Name is Required",
                          })}
                          id="name"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                              message: "Email is not valid",
                            },
                          })}
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone No.
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "Phone No. is required!",
                          })}
                          autoComplete="phone"
                          type="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "Street-address is required",
                          })}
                          id="street"
                          autoComplete="street-address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "City is required",
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "state is required",
                          })}
                          id="region"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pincode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pincode", {
                            required: "pincode is required",
                          })}
                          id="pincode"
                          autoComplete="postal-code"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      onClick={() => reset()}
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add address
                    </button>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Address
                  </h2>
                  {addresses && addresses.length > 0 ? (
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose from existing addresses
                    </p>
                  ) : (
                    <div className="text-center mt-4">
                      <p className="text-red-500">
                        Please Add Your shipping address to Order
                      </p>
                    </div>
                  )}

                  <ul className="divide-y divide-gray-200">
                    {addresses &&
                      addresses.map((addresses, index) => (
                        <li
                          key={index}
                          className="flex justify-between gap-x-6 py-5"
                        >
                          <div className="flex min-w-0 gap-x-4">
                            <input
                              onChange={(e) => handleAddress(e, index)}
                              value={selectedAddress}
                              name="address"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {addresses.name}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {addresses.email}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {addresses.phone}
                              </p>
                            </div>
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              {addresses.city}
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              {addresses.street}
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              {addresses.pinCode}
                            </p>
                          </div>
                        </li>
                      ))}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose One
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            onChange={(e) => handlePayment(e)}
                            name="payments"
                            type="radio"
                            value={paymentMethod}
                            checked={paymentMethod === "cash"}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            onChange={(e) => handlePayment(e)}
                            name="payments"
                            type="radio"
                            value={paymentMethod}
                            checked={paymentMethod === "card"}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Cart */}
          <div className="lg:col-span-2">
            <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-2 lg:px-4">
              <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">
                  Cart
                </h1>
                {/* 244 */}
              </div>
              <div className="border-t border-gray-200 px-2 py-4 sm:px-4">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {items.map((product) => (
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
                                ${" "}
                                {discountedPrice(
                                  product.product.price,
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

              <div className="border-t border-gray-200 px-2 py-4 sm:px-4">
                <div className="flex justify-between text-base font-medium text-gray-900 border-b py-3">
                  <p>Total Items in Cart</p>
                  <p>{totalItems} Items</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900 mt-3">
                  <p>Subtotal</p>
                  <p>$ {totalAmount}</p>
                </div>
                {selectedAddress === "" ? (
                  <div className="text-center mt-4">
                    <p className="text-red-500">
                      Please Select Shipping address
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mt-6">
                      <div
                        onClick={() => handleOrder()}
                        className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Order Now
                      </div>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
