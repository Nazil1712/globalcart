import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByIdAsync } from "../productSlice";
import { useParams, Link } from "react-router-dom";
import { addToCartAsync } from "../../cart/cartSlice";
import { discountedPrice } from "../../../app/constants";
import { toast } from "react-toastify";
import ProductdetailShimmer from "../../shimmer/ProductdetailShimmer";
import { motion, AnimatePresence } from "framer-motion";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  const cartItems = useSelector((state) => state.cart.items);
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.selectedProduct);
  const status = useSelector((state) => state.product.status);

  const handleCart = (e) => {
    const index = cartItems.findIndex((item) => item.product.id === product.id);

    if (index < 0) {
      const newItem = {
        quantity: 1,
        product: product.id,
      };
      dispatch(addToCartAsync(newItem));
      toast.success("Item Added In cart");
    } else {
      toast.info("Item Already Added");
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(id));
  }, [dispatch, id]);

  return (
    <div className="bg-transparent pb-16">
      {status === "loading" ? (
        <ProductdetailShimmer />
      ) : (
        product && (
          <div className="pt-6">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-slate-500">
                <li>
                  <Link
                    to="/"
                    className="hover:text-indigo-600 transition-colors font-semibold"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <span className="mx-2 text-slate-300">/</span>
                </li>
                <li>
                  <span className="text-slate-900 font-bold capitalize">
                    {product.category}
                  </span>
                </li>
              </ol>
            </nav>

            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
              {/* Image gallery */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-6"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-[2.5rem] bg-white premium-shadow border border-slate-100">
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    src={product.images[selectedImage]}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedImage(index)}
                      className={classNames(
                        index === selectedImage
                          ? "ring-2 ring-indigo-600 ring-offset-2"
                          : "ring-1 ring-slate-200",
                        "relative h-24 overflow-hidden rounded-2xl bg-white transition-all shadow-sm",
                      )}
                    >
                      <img
                        src={image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Product info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-indigo-100">
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
                    <StarIcon className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-bold text-amber-700">
                      {product.rating} Rating
                    </span>
                  </div>
                </div>

                <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
                  {product.title}
                </h1>

                <div className="flex items-baseline gap-4 mb-10">
                  <p className="text-5xl font-black text-slate-900">
                    ₹
                    {discountedPrice(product.price, product.discountPercentage)}
                  </p>
                  {product.discountPercentage > 0 && (
                    <div className="flex flex-col">
                      <p className="text-xl text-slate-400 line-through font-medium">
                        ₹{product.price}
                      </p>
                      <p className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-lg border border-green-100">
                        {product.discountPercentage}% OFF
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                      The Description
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed font-medium">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: "#4f46e5" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCart}
                        className="flex-1 bg-indigo-600 text-white px-8 py-5 rounded-[1.5rem] text-lg font-bold shadow-2xl shadow-indigo-200 transition-all flex items-center justify-center gap-3"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          ></path>
                        </svg>
                        Add to Cart
                      </motion.button>
                      <motion.button
                        whileHover={{
                          scale: 1.05,
                          ringColor: "#fecaca",
                          color: "#ef4444",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="p-5 rounded-[1.5rem] bg-white ring-1 ring-slate-200 text-slate-400 transition-all shadow-sm"
                      >
                        <svg
                          className="h-7 w-7"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          ></path>
                        </svg>
                      </motion.button>
                    </div>
                  </div>

                  {/* Highlights/Features */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {[
                      {
                        label: "Stock Status",
                        value: product.stock > 0 ? "In Stock" : "Out of Stock",
                        color:
                          product.stock > 0
                            ? "text-green-600 bg-green-50"
                            : "text-red-600 bg-red-50",
                      },
                      {
                        label: "Product Category",
                        value: product.category,
                        color: "text-slate-700 bg-slate-50",
                      },
                      {
                        label: "Free Shipping",
                        value: "Everywhere",
                        color: "text-slate-700 bg-slate-50",
                      },
                      {
                        label: "Secure Payment",
                        value: "100% Verified",
                        color: "text-slate-700 bg-slate-50",
                      },
                    ].map((feat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className={`${feat.color} p-5 rounded-3xl border border-white/50 shadow-sm`}
                      >
                        <p className="text-[10px] font-black opacity-60 uppercase tracking-wider mb-1">
                          {feat.label}
                        </p>
                        <p className={`text-sm font-extrabold`}>{feat.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
