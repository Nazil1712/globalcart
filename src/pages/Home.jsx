import { useDispatch, useSelector } from "react-redux";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import Productlist from "../features/product/components/Productlist";
import ProductListShimmerPage from "./shimmer/ProductListShimmerPage";
import { useEffect } from "react";
import { fetchCartByUserAsync } from "../features/cart/cartSlice";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const listStatus = useSelector((state) => state.product.status);

  return (
    <div className="bg-slate-50/50 min-h-screen">
      <Navbar>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-[3rem] bg-indigo-600 premium-shadow mb-16">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

            <div className="relative px-8 py-20 sm:px-16 sm:py-32 lg:px-24">
              <div className="max-w-2xl">
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block glass-dark px-4 py-1.5 rounded-full text-xs font-bold text-white tracking-widest uppercase mb-6"
                >
                  Summer Collection 2026
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl sm:text-7xl font-black text-white mb-8 leading-[1.1]"
                >
                  Elevate Your <br />
                  <span className="text-indigo-200 underline decoration-indigo-400/50 underline-offset-8">
                    Lifestyle
                  </span>{" "}
                  Today.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg sm:text-xl text-indigo-100 mb-10 max-w-lg leading-relaxed font-medium"
                >
                  Experience the pinnacle of curated shopping with GlobalCart.
                  Premium products, unmatched quality, and seamless delivery.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-4"
                >
                  <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl text-base font-bold shadow-xl hover:bg-indigo-50 transition-all">
                    Shop Now
                  </button>
                  <button className="glass-dark text-white px-8 py-4 rounded-2xl text-base font-bold hover:bg-white/20 transition-all border border-white/20">
                    Explore Trends
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          </div>

          <Productlist />
        </motion.div>
      </Navbar>
      <Footer />
    </div>
  );
}

export default Home;
