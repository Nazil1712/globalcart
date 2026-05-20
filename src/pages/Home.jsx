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
            <div className="relative overflow-hidden rounded-3xl lg:rounded-[3.5rem] bg-slate-900 mb-4 sm:mb-8 lg:mb-16 premium-shadow">
              {/* Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-purple-900/30" />
              <div className="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[600px] lg:h-[600px] bg-indigo-600/20 blur-[60px] sm:blur-[80px] lg:blur-[120px] rounded-full -mr-24 -mt-24 lg:-mr-48 lg:-mt-48 animate-pulse" />
              <div className="absolute bottom-0 left-0 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[400px] lg:h-[400px] bg-purple-600/10 blur-[40px] sm:blur-[60px] lg:blur-[100px] rounded-full -ml-16 -mb-16 lg:-ml-32 lg:-mb-32" />

              <div className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-20 lg:py-16">
                <div className="grid lg:grid-cols-2 items-center gap-6 lg:gap-16">
                  {/* Left Content */}
                  <div className="max-w-xl text-center lg:text-left order-2 lg:order-1">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] lg:text-[10px] font-black text-indigo-400 tracking-widest uppercase mb-4 lg:mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                        New Season Arrivals
                      </span>
                      <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.2] mb-4 lg:mb-8 tracking-tighter">
                        Elevate Your{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                          Lifestyle
                        </span>{" "}
                        Standard.
                      </h1>
                    <p className="text-slate-400 text-xs sm:text-base lg:text-xl font-medium leading-relaxed mb-5 lg:mb-10 max-w-lg mx-auto lg:mx-0">
                      Experience the next generation of curated premium goods.
                    </p>
                    <div className="flex flex-row items-center gap-2 justify-center lg:justify-start">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          productsRef.current?.scrollIntoView({
                            behavior: "smooth",
                          })
                        }
                        className="flex-1 sm:flex-initial bg-indigo-600 text-white px-5 py-3 sm:px-6 sm:py-4 lg:px-10 lg:py-5 rounded-xl lg:rounded-2xl text-[11px] sm:text-xs lg:text-sm font-black shadow-2xl shadow-indigo-500/20 hover:bg-indigo-500 transition-all uppercase tracking-widest cursor-pointer text-center"
                      >
                        Explore
                      </motion.button>
                      <Link to={"/about-us"} className="flex-1 sm:flex-initial">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full bg-white/5 text-white px-5 py-3 sm:px-6 sm:py-4 lg:px-10 lg:py-5 rounded-xl lg:rounded-2xl text-[11px] sm:text-xs lg:text-sm font-black border border-white/10 hover:bg-white/10 transition-all uppercase tracking-widest cursor-pointer text-center"
                        >
                          Our Story
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                </div>

                {/* Right Image/Graphic - hidden on mobile for extreme usability */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="order-1 lg:order-2 hidden lg:flex justify-center"
                >
                  <div className="relative group">
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
