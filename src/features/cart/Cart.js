import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { increment, incrementAsync, selectCount } from "./counterSlice";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { deleteItemAsync, updateItemAsync } from "./cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.items);
  const totalAmount = products.reduce(
    (prevAmount, item) => item.quantity * item.price + prevAmount,
    0
  );
  const totalItems = products.reduce(
    (prevCount, item) => item.quantity + prevCount,
    0
  );

  const handleQuantity = (e,item) =>{
    dispatch(updateItemAsync({...item, quantity:+e.target.value}))
  }

  const handleDelete = (id) =>{
    dispatch(deleteItemAsync(id))
  }

  return (
    <>
    {!products.length && <Navigate to={'/'}/>}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">
            Cart
          </h1>
        </div>
      </header>
      <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {products.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={product.href}>{product.title}</a>
                        </h3>
                        <p className="ml-4">$ {product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        Qty
                        <select className="ml-2 h-10" onChange={(e)=>handleQuantity(e,product)}>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                        </select>
                      </div>

                      <div className="flex">
                        <button
                        onClick={()=>handleDelete(product.id)}
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
            <p>$ {totalAmount}</p>
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
    </>
  );
}
