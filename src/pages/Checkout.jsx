import { PhotoIcon, UserCircleIcon, MapPinIcon, CreditCardIcon, BanknotesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  deleteFromCartAsync,
  updateCartAsync,
} from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createOrderAsync } from "../features/order/orderSlice";
import { discountedPrice } from "../app/constants";
import PopupBox from "../features/common/Dialog";
import { updateUserAsync } from "../features/user/userSlice";

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
  // console.log("===>UserInfo",userInfo)
  const currentOrder = useSelector((state) => state.order.currentOrder);
  const addresses = userInfo?.addresses;
  // console.log("addresses",addresses);
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
    // console.log("order",order)
    dispatch(createOrderAsync(order));
  };

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
      {!items.length && <Navigate to={"/"} />}
      {currentOrder && currentOrder.paymentMethod === 'cash' && <Navigate to={`/order-success/${currentOrder.id}`} />}
      {currentOrder && currentOrder.paymentMethod === 'card' && <Navigate to={`/stripe-checkout/`} />}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
        <header className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black tracking-tight text-slate-900 mb-2"
          >
            Checkout
          </motion.h1>
          <p className="text-slate-500 font-medium">Complete your order and start experiencing premium quality.</p>
        </header>

        <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12 items-start">
          {/* Main Content: Forms & Addresses */}
          <div className="lg:col-span-7 space-y-10">
            {/* Address Form Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[2.5rem] premium-shadow border border-slate-100 overflow-hidden"
            >
              <div className="p-8 border-b border-slate-50">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white text-lg font-black">1</span>
                  Personal Details
                </h2>
              </div>
              <form
                className="p-8"
                onSubmit={handleSubmit((data) => {
                  dispatch(
                    updateUserAsync({
                      ...userInfo,
                      addresses: addresses ? [...addresses, data] : [data],
                    })
                  );
                  reset();
                })}
              >
                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Full Name</label>
                    <input
                      type="text"
                      {...register("name", { required: "Name is Required" })}
                      className="block w-full rounded-2xl border-slate-200 bg-slate-50/50 py-3.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm transition-all"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-2 text-xs font-bold text-red-500 ml-1">{errors.name.message}</p>}
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email address</label>
                    <input
                      type="email"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: { value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: "Email is not valid" }
                      })}
                      className="block w-full rounded-2xl border-slate-200 bg-slate-50/50 py-3.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm transition-all"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-2 text-xs font-bold text-red-500 ml-1">{errors.email.message}</p>}
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Phone Number</label>
                    <input
                      type="tel"
                      {...register("phone", { required: "Phone No. is required!" })}
                      className="block w-full rounded-2xl border-slate-200 bg-slate-50/50 py-3.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Street address</label>
                    <input
                      type="text"
                      {...register("street", { required: "Street-address is required" })}
                      className="block w-full rounded-2xl border-slate-200 bg-slate-50/50 py-3.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm transition-all"
                      placeholder="123 Main St"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">City</label>
                    <input
                      type="text"
                      {...register("city", { required: "City is required" })}
                      className="block w-full rounded-2xl border-slate-200 bg-slate-50/50 py-3.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">State / Province</label>
                    <input
                      type="text"
                      {...register("state", { required: "state is required" })}
                      className="block w-full rounded-2xl border-slate-200 bg-slate-50/50 py-3.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">ZIP / Postal</label>
                    <input
                      type="text"
                      {...register("pincode", { required: "pincode is required" })}
                      className="block w-full rounded-2xl border-slate-200 bg-slate-50/50 py-3.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-4">
                  <button
                    onClick={() => reset()}
                    type="button"
                    className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors px-4"
                  >
                    Reset
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                  >
                    Add Address
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Address Selection */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[2.5rem] premium-shadow border border-slate-100 overflow-hidden"
            >
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white text-lg font-black">2</span>
                  Shipping Address
                </h2>
                {addresses?.length > 0 && <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{addresses.length} saved</span>}
              </div>
              
              <div className="p-8">
                {addresses && addresses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((addr, index) => (
                      <div 
                        key={index}
                        onClick={() => setSelectedAdddress(addr)}
                        className={`cursor-pointer group relative p-5 rounded-3xl border-2 transition-all ${
                          selectedAddress === addr 
                            ? "border-indigo-600 bg-indigo-50/50 ring-4 ring-indigo-50" 
                            : "border-slate-100 bg-slate-50/50 hover:border-slate-200"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className={`p-2 rounded-xl ${selectedAddress === addr ? "bg-indigo-600 text-white" : "bg-white text-slate-400 shadow-sm"}`}>
                            <MapPinIcon className="w-5 h-5" />
                          </div>
                          <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedAddress === addr ? "border-indigo-600" : "border-slate-200"}`}>
                            {selectedAddress === addr && <div className="h-2.5 w-2.5 rounded-full bg-indigo-600" />}
                          </div>
                        </div>
                        <p className="font-bold text-slate-900">{addr.name}</p>
                        <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
                          {addr.street}, {addr.city}<br />
                          {addr.state} - {addr.pincode}
                        </p>
                        <p className="text-xs font-bold text-slate-900 mt-4">{addr.phone}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-bold">No addresses found. Please add one above.</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2.5rem] premium-shadow border border-slate-100 overflow-hidden"
            >
              <div className="p-8 border-b border-slate-50">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white text-lg font-black">3</span>
                  Payment Method
                </h2>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    onClick={() => setPaymentMethod("cash")}
                    className={`cursor-pointer flex items-center gap-4 p-6 rounded-3xl border-2 transition-all ${
                      paymentMethod === "cash" 
                        ? "border-indigo-600 bg-indigo-50/50 ring-4 ring-indigo-50" 
                        : "border-slate-100 bg-slate-50/50 hover:border-slate-200"
                    }`}
                  >
                    <div className={`p-3 rounded-2xl ${paymentMethod === "cash" ? "bg-indigo-600 text-white" : "bg-white text-slate-400 shadow-sm"}`}>
                      <BanknotesIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Cash on Delivery</p>
                      <p className="text-xs font-medium text-slate-500">Pay when you receive</p>
                    </div>
                  </div>

                  <div 
                    onClick={() => setPaymentMethod("card")}
                    className={`cursor-pointer flex items-center gap-4 p-6 rounded-3xl border-2 transition-all ${
                      paymentMethod === "card" 
                        ? "border-indigo-600 bg-indigo-50/50 ring-4 ring-indigo-50" 
                        : "border-slate-100 bg-slate-50/50 hover:border-slate-200"
                    }`}
                  >
                    <div className={`p-3 rounded-2xl ${paymentMethod === "card" ? "bg-indigo-600 text-white" : "bg-white text-slate-400 shadow-sm"}`}>
                      <CreditCardIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Online Payment</p>
                      <p className="text-xs font-medium text-slate-500">Secure card checkout</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content: Order Summary */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[2.5rem] premium-shadow border border-slate-100 sticky top-28 overflow-hidden"
            >
              <div className="p-8 border-b border-slate-50">
                <h2 className="text-2xl font-black text-slate-900">Order Summary</h2>
              </div>
              
              <div className="p-8">
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map((product) => (
                    <div key={product.product.id} className="flex gap-4 group">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform">
                        <img src={product.product.thumbnail} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{product.product.title}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs font-bold text-slate-400">Qty {product.quantity}</p>
                          <p className="text-sm font-black text-slate-900">${discountedPrice(product.product.price, product.product.discountPercentage)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Total Items</span>
                    <span className="font-bold text-slate-900">{totalItems} items</span>
                  </div>
                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-bold">Free</span>
                  </div>
                  <div className="pt-4 mt-4 flex justify-between items-center border-t border-slate-100">
                    <span className="text-lg font-bold text-slate-900">Total Amount</span>
                    <span className="text-3xl font-black text-indigo-600">${totalAmount}</span>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {selectedAddress === "" ? (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 text-center">
                      <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">Please Select Shipping Address</p>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOrder()}
                      className="w-full bg-slate-900 text-white py-5 rounded-2xl text-lg font-bold shadow-2xl shadow-slate-200 hover:bg-indigo-600 transition-all flex items-center justify-center gap-3"
                    >
                      Complete Purchase
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </motion.button>
                  )}
                  
                  <Link to="/" className="block text-center text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors py-2">
                    Back to Shopping
                  </Link>
                </div>
              </div>

              <div className="bg-slate-50 p-6 flex justify-center border-t border-slate-100">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                  256-bit Secure Checkout
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
