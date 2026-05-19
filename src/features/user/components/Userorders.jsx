import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderByUserAsync } from "../userSlice";
import { updateOrderAsync } from "../../order/orderSlice";
import { discountedPrice, formatPrice } from "../../../app/constants";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircleIcon,
  TruckIcon,
  ClockIcon,
  XCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { MapPinIcon } from "@heroicons/react/24/outline";
import PopupBox from "../../common/Dialog";

export default function Userorders() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const Userorders = useSelector((state) => state.user.userInfo?.orders);
  const exchangeRate = useSelector((state) => state.product.exchangeRate) || 1;
  const [showCancelPopUp, setShowCancelPopUp] = useState(null);
  // console.log("UserInfo from userOrder", userInfo);
  // console.log("USer,", loggedInUserToken);
  // console.log("User Orders", Userorders);

  useEffect(() => {
    if (userInfo && !Userorders) {
      dispatch(fetchOrderByUserAsync());
    }
  }, [dispatch, userInfo, Userorders]);

  const handleCancelOrder = async (order) => {
    await dispatch(updateOrderAsync({ ...order, status: "cancelled" }));
    dispatch(fetchOrderByUserAsync());
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <ClockIcon className="w-4 h-4" />;
      case "dispatched":
        return <TruckIcon className="w-4 h-4" />;
      case "delivered":
        return <CheckCircleIcon className="w-4 h-4" />;
      case "cancelled":
        return <XCircleIcon className="w-4 h-4" />;
      default:
        return <ClockIcon className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-amber-600 bg-amber-50 border-amber-100";
      case "dispatched":
        return "text-indigo-600 bg-indigo-50 border-indigo-100";
      case "delivered":
        return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "cancelled":
        return "text-rose-600 bg-rose-50 border-rose-100";
      default:
        return "text-slate-600 bg-slate-50 border-slate-100";
    }
  };

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-12">
        <header className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black tracking-tight text-slate-900 mb-2"
          >
            Your Orders
          </motion.h1>
          <p className="text-slate-500 font-medium">
            Track your deliveries and view order history.
          </p>
        </header>

        <div className="space-y-8">
          <AnimatePresence>
            {Userorders && Userorders.length > 0 ? (
              Userorders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-[2.5rem] premium-shadow border border-slate-100 overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="p-8 border-b border-slate-50 flex flex-wrap justify-between items-center gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Order Reference
                      </p>
                      <h3 className="text-xl font-black text-slate-900">
                        #{order.id.slice(-8).toUpperCase()}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status == "cancelled"
                          ? "Order Cancelled"
                          : order.status}
                      </span>
                      {order.status === "pending" && (
                        <div className="flex items-center gap-2">
                          <PopupBox
                            title="Cancel Order"
                            message={`Are you sure you want to cancel order #${order.id.slice(-8).toUpperCase()}?`}
                            dangerOption="Cancel Order"
                            cancelOption="Keep Order"
                            dangerAction={() => {
                              handleCancelOrder(order);
                              setShowCancelPopUp(null);
                            }}
                            cancleAction={() => setShowCancelPopUp(null)}
                            showPopUp={showCancelPopUp === order.id}
                          />
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowCancelPopUp(order.id)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-rose-200 text-rose-600 bg-white hover:bg-rose-50 transition-colors"
                          >
                            <XCircleIcon className="w-4 h-4" />
                            Cancel Order
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="p-8">
                    <ul className="space-y-6">
                      {order.items.map((item) => (
                        <li
                          key={item.product.id}
                          className="flex items-center gap-6 group"
                        >
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div className="flex-1 flex flex-col justify-center">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                  {item.product.title}
                                </h4>
                                <p className="text-sm font-bold text-slate-400 mt-1">
                                  {item.product.brand}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-black text-slate-900">
                                  ₹
                                  {formatPrice(Math.round(discountedPrice(
                                    item.product.price,
                                    item.product.discountPercentage,
                                  ) * exchangeRate))}
                                </p>
                                <p className="text-xs font-bold text-slate-400">
                                  Qty: {item.quantity || item.product.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Order Footer & Shipping */}
                  <div className="p-8 bg-slate-50/50 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        Shipping Address
                      </p>
                      <div className="flex gap-4">
                        <div className="p-3 rounded-2xl bg-white shadow-sm h-fit">
                          <MapPinIcon className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="text-sm">
                          <p className="font-bold text-slate-900">
                            {order.selectedAddress.name}
                          </p>
                          <p className="text-slate-500 font-medium leading-relaxed mt-1">
                            {order.selectedAddress.street},{" "}
                            {order.selectedAddress.city}
                            <br />
                            {order.selectedAddress.state} -{" "}
                            {order.selectedAddress.pinCode}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end items-end space-y-4">
                      <div className="text-right space-y-1">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                          Total Amount Paid
                        </p>
                        <p className="text-3xl font-black text-indigo-600">
                          ₹{formatPrice(order.totalAmount)}
                        </p>
                        <p className="text-xs font-bold text-slate-400 uppercase">
                          {order.totalItems} Items
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-[3rem] premium-shadow border border-slate-100">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TruckIcon className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  No orders yet
                </h3>
                <p className="text-slate-500 font-medium mb-8">
                  Start shopping to see your orders here!
                </p>
                <Link to="/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl text-sm font-bold shadow-xl shadow-indigo-100"
                  >
                    Go Shopping
                  </motion.button>
                </Link>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
