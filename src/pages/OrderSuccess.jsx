import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetCurrentOrder } from "../features/order/orderSlice";
import orderSucess from "../images/order_sucess.png";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import {
  CheckBadgeIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

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
    <div className="bg-slate-50/50 min-h-screen flex items-center justify-center p-4">
      <main className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glass bg-white/70 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-16 text-center premium-shadow border border-white relative overflow-hidden"
        >
          {/* Decorative background pulse */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full -mt-32" />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10"
          >
            <CheckBadgeIcon className="w-12 h-12 text-emerald-600" />
          </motion.div>

          <div className="relative z-10 space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight"
            >
              Order Confirmed!
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-900/5 rounded-2xl py-4 px-6 inline-block border border-slate-900/5"
            >
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                Order Reference
              </p>
              <p className="text-xl font-black text-slate-900">
                #{id.slice(-8).toUpperCase()}
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-slate-500 font-medium text-sm md:text-lg leading-relaxed max-w-md mx-auto"
            >
              Thank you for your purchase. We're getting your order ready for
              shipment. You'll receive an email confirmation shortly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-indigo-600 text-white px-6 md:px-10 py-3.5 md:py-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all uppercase tracking-widest"
                >
                  Continue Shopping
                </motion.button>
              </Link>
              <Link to="/orders" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-slate-900 text-white px-6 md:px-10 py-3.5 md:py-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-black shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  Track Order
                  <ArrowRightIcon className="w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-slate-400 font-bold text-sm mt-8"
        >
          Need help?{" "}
          <Link to="/support" className="text-indigo-600 hover:underline">
            Contact our support team
          </Link>
        </motion.p> */}
      </main>
    </div>
  );
}

export default OrderSuccess;
