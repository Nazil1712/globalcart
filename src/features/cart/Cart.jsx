import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { deleteFromCartAsync, updateCartAsync } from "./cartSlice";
import { discountedPrice, formatPrice } from "../../app/constants";
import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/outline";
import PopupBox from "../common/Dialog";
import emptyCartUpper from "../../images/empty_cart_upper.png";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const [showPopUp, setShowPopUp] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.items);
  const exchangeRate = useSelector((state) => state.product.exchangeRate);

  const totalAmount = Math.round(products.reduce(
    (prevAmount, item) =>
      item.quantity *
        discountedPrice(item.product.price, item.product.discountPercentage) +
      prevAmount,
    0,
  ) * exchangeRate);
  const totalItems = products.reduce(
    (prevCount, item) => item.quantity + prevCount,
    0,
  );

  const handleQuantity = (newQty, item) => {
    if (newQty > 0 && newQty <= 10) {
      dispatch(updateCartAsync({ id: item.id, quantity: newQty }));
    } else if (newQty === 0) {
      dispatch(deleteFromCartAsync(item.id));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteFromCartAsync(id));
  };

  return (
    <div className="bg-transparent pb-20">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-2"
          >
            Your Shopping Cart
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-medium"
          >
            {totalItems} items ready for checkout
          </motion.p>
        </header>

        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2rem] md:rounded-[3rem] premium-shadow p-6 py-12 md:p-12 text-center border border-slate-100"
          >
            <div className="max-w-md mx-auto">
              <img
                src={emptyCartUpper}
                alt="empty_cart_img"
                className="mx-auto w-48 md:w-64 h-auto mb-6 md:mb-8 grayscale opacity-50"
              />
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 md:mb-4">
                Your cart is empty
              </h2>
              <p className="text-sm md:text-base text-slate-500 mb-8 md:mb-10 font-medium px-4">
                Looks like you haven't added anything to your cart yet. Explore
                our latest products and find something you love!
              </p>
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-indigo-600 text-white px-8 py-3.5 md:px-10 md:py-4 rounded-xl md:rounded-2xl text-sm md:text-lg font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                >
                  Continue Shopping
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-3xl md:rounded-[2rem] p-4 md:p-6 premium-shadow border border-slate-100 flex gap-4 md:gap-6 items-start md:items-center"
                  >
                    <div className="h-24 w-24 md:h-32 md:w-32 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform">
                      <img
                        src={product.product.thumbnail}
                        alt={product.product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:gap-4">
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-2 md:line-clamp-none">
                            <Link to={`/product-detail/${product.product.id}`}>
                              {product.product.title}
                            </Link>
                          </h3>
                          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                            {product.product.brand}
                          </p>
                        </div>
                        <p className="text-lg md:text-xl font-black text-slate-900 mt-2 sm:mt-0">
                          ₹
                          {formatPrice(Math.round(discountedPrice(
                            product.product.price,
                            product.product.discountPercentage,
                          ) * exchangeRate))}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4 md:mt-6">
                        <div className="flex items-center gap-2 md:gap-3">
                          <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase hidden sm:inline">
                            Quantity
                          </span>
                          <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                            <button
                              onClick={() => handleQuantity(product.quantity - 1, product)}
                              className="p-2 hover:bg-slate-100 transition-colors"
                            >
                              <MinusIcon className="w-4 h-4 text-slate-600" />
                            </button>
                            <span className="px-3 font-bold text-slate-900 text-sm">{product.quantity}</span>
                            <button
                              onClick={() => handleQuantity(product.quantity + 1, product)}
                              className="p-2 hover:bg-slate-100 transition-colors disabled:opacity-50"
                              disabled={product.quantity >= 10}
                            >
                              <PlusIcon className="w-4 h-4 text-slate-600" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 md:gap-2">
                          <PopupBox
                            title={`Remove item?`}
                            message={`Do you want to remove ${product.product.title} from your cart?`}
                            dangerOption={"Remove"}
                            cancelOption={"Cancel"}
                            dangerAction={() => handleDelete(product.id)}
                            cancleAction={() => setShowPopUp(-1)}
                            showPopUp={showPopUp === product.id}
                          />
                          <button
                            onClick={() => setShowPopUp(product.id)}
                            className="text-slate-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 transition-all"
                            title="Remove from cart"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 premium-shadow border border-slate-100 sticky top-28"
            >
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-6 md:mb-8">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Total Items</span>
                  <span>{totalItems} items</span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Tax (Estimated)</span>
                  <span>₹0.00</span>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4 flex justify-between">
                  <span className="text-lg font-bold text-slate-900">
                    Total Amount
                  </span>
                  <span className="text-2xl font-black text-indigo-600">
                    ₹{formatPrice(totalAmount)}
                  </span>
                </div>
              </div>

              <Link to="/checkout">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl text-lg font-bold shadow-2xl shadow-slate-200 hover:bg-indigo-600 transition-all flex items-center justify-center gap-3"
                >
                  Proceed to Checkout
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </motion.button>
              </Link>

              <div className="mt-6 flex justify-center text-sm font-bold text-slate-400">
                <span>Secure Payment Guaranteed</span>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
