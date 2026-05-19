import { useDispatch, useSelector } from "react-redux";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import Productlist from "../features/product/components/Productlist";
import ProductListShimmerPage from "./shimmer/ProductListShimmerPage";
import { useEffect, useRef } from "react";
import { fetchCartByUserAsync } from "../features/cart/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  const listStatus = useSelector((state) => state.product.status);
  const productsRef = useRef(null);

  return (
    <div className="bg-slate-50/50 min-h-screen">
      <Navbar>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-[3.5rem] bg-slate-900 mb-16 premium-shadow">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-purple-900/30" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full -mr-48 -mt-48 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full -ml-32 -mb-32" />

            <div className="relative px-8 py-12 lg:px-20 lg:py-16">
              <div className="grid lg:grid-cols-2 items-center gap-16">
                {/* Left Content */}
                <div className="max-w-xl text-center lg:text-left order-2 lg:order-1">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full text-[10px] font-black text-indigo-400 tracking-widest uppercase mb-8">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                      New Season Arrivals
                    </span>
                    <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
                      Elevate Your{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                        Lifestyle
                      </span>{" "}
                      Standard.
                    </h1>
                    <p className="text-slate-400 text-lg lg:text-xl font-medium leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
                      Experience the next generation of curated premium goods.
                      Sophisticated design meets exceptional quality.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          productsRef.current?.scrollIntoView({
                            behavior: "smooth",
                          })
                        }
                        className="w-full sm:w-auto bg-indigo-600 text-white px-10 py-5 rounded-2xl text-sm font-black shadow-2xl shadow-indigo-500/20 hover:bg-indigo-500 transition-all uppercase tracking-widest"
                      >
                        Explore Collection
                      </motion.button>
                      <Link to={"/about-us"}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full sm:w-auto glass-dark text-white px-10 py-5 rounded-2xl text-sm font-black border border-white/10 hover:bg-white/10 transition-all uppercase tracking-widest"
                        >
                          Our Story
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                </div>

                {/* Right Image/Graphic */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="order-1 lg:order-2 flex justify-center"
                >
                  <div className="relative group">
                    {/* Image Placeholder with glass effect behind */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                    <motion.div
                      animate={{ y: [0, -15, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative z-10"
                    >
                      <img
                        src="/ecommerce_hero.png"
                        alt="Premium Products"
                        className="w-full max-w-[500px] rounded-[3rem] shadow-2xl transform transition-transform group-hover:scale-105 cursor-pointer"
                      />
                      {/* Floating Badges */}
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1,
                        }}
                        className="absolute -top-6 -right-6 glass bg-white/10 p-4 rounded-3xl border border-white/20 premium-shadow hidden sm:block"
                      >
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                          Premium Quality
                        </p>
                        <p className="text-white font-bold">Guaranteed</p>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div ref={productsRef}>
            <Productlist />
          </div>
        </motion.div>
      </Navbar>
      <Footer />
    </div>
  );
}

export default Home;
