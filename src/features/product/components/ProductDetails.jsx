import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdAsync,
  fetchProductsByFilterAsync,
} from "../productSlice";
import { useParams, Link } from "react-router-dom";
import {
  addToCartAsync,
  updateCartAsync,
  deleteFromCartAsync,
} from "../../cart/cartSlice";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { discountedPrice, formatPrice } from "../../../app/constants";
import {
  addToWishlistAsync,
  deleteFromWishlistAsync,
} from "../../wishlist/wishlistSlice";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { Bounce, toast } from "react-toastify";
import ProductdetailShimmer from "../../shimmer/ProductdetailShimmer";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckBadgeIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

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
  const relatedProducts = useSelector((state) => state.product.products);
  const exchangeRate = useSelector((state) => state.product.exchangeRate);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isInWishlist = wishlistItems?.some((item) => {
    const prodId = item.product?.id || item.product;
    return prodId === product?.id;
  });

  const cartItem = cartItems?.find((item) => item.product.id === product?.id);

  const handleQuantity = (newQty, item, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (newQty > 0 && newQty <= 10) {
      dispatch(updateCartAsync({ id: item.id, quantity: newQty }));
    } else if (newQty === 0) {
      dispatch(deleteFromCartAsync(item.id));
    }
  };

  const handleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const index = cartItems.findIndex((item) => item.product.id === product.id);

    if (index < 0) {
      const newItem = {
        quantity: 1,
        product: product.id,
      };
      dispatch(addToCartAsync(newItem));
      toast.success("Item Added In cart", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.info("Item Already Added", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      dispatch(deleteFromWishlistAsync(product.id));
      // toast.success("Removed from Wishlist");
    } else {
      dispatch(addToWishlistAsync(product));
      toast.success("Added to Wishlist", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.category && product.id === id) {
      dispatch(
        fetchProductsByFilterAsync({
          filter: { category: [product.category] },
          sort: { _sort: "rating", _order: "desc" },
          pagination: { _page: 1, _limit: 4 },
        }),
      );
    }
  }, [dispatch, product?.id, product?.category, id]);

  return (
    <div className="bg-transparent pb-20">
      {!product && status === "loading" ? (
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
                  {product.brand ? (
                    <span
                      className={`bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-indigo-100`}
                    >
                      {product.brand}
                    </span>
                  ) : (
                    <span></span>
                  )}
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
                    {formatPrice(
                      Math.round(
                        discountedPrice(
                          product.price,
                          product.discountPercentage,
                        ) * exchangeRate,
                      ),
                    )}
                  </p>
                  {product.discountPercentage > 0 && (
                    <div className="flex flex-col">
                      <p className="text-xl text-slate-400 line-through font-medium">
                        ₹{formatPrice(Math.round(product.price * exchangeRate))}
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
                      {cartItem ? (
                        <div className="flex-1 flex items-center justify-between bg-white/40 backdrop-blur-md border border-white/60 rounded-[1.5rem] shadow-sm p-1.5 h-[64px]">
                          <motion.div
                            role="button"
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: "rgba(255,255,255,0.8)",
                            }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) =>
                              handleQuantity(cartItem.quantity - 1, cartItem, e)
                            }
                            className="p-3 rounded-xl transition-colors cursor-pointer"
                          >
                            <MinusIcon className="w-5 h-5 text-slate-600" />
                          </motion.div>

                          <div className="flex flex-col items-center">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                              In Cart
                            </span>
                            <span className="font-black text-slate-900 text-xl">
                              {cartItem.quantity}
                            </span>
                          </div>

                          <motion.div
                            role="button"
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: "rgba(255,255,255,0.8)",
                            }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) =>
                              handleQuantity(cartItem.quantity + 1, cartItem, e)
                            }
                            className="p-3 rounded-xl transition-colors cursor-pointer"
                          >
                            <PlusIcon className="w-5 h-5 text-slate-600" />
                          </motion.div>
                        </div>
                      ) : (
                        <motion.div
                          role="button"
                          whileHover={{
                            scale: 1.02,
                            backgroundColor: "#4f46e5",
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleCart}
                          className="flex-1 bg-indigo-600 text-white px-8 py-5 rounded-[1.5rem] text-lg font-bold shadow-2xl shadow-indigo-200 transition-all flex items-center justify-center gap-3 cursor-pointer"
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
                        </motion.div>
                      )}
                      <motion.button
                        whileHover={{
                          scale: 1.05,
                          ringColor: isInWishlist ? "#fecaca" : "#e2e8f0",
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleWishlist}
                        className={classNames(
                          isInWishlist
                            ? "text-red-500 bg-red-50 ring-red-200"
                            : "text-slate-400 bg-white ring-slate-200",
                          "p-5 rounded-[1.5rem] ring-1 transition-all shadow-sm",
                        )}
                      >
                        {isInWishlist ? (
                          <HeartIconSolid className="h-7 w-7" />
                        ) : (
                          <HeartIconOutline className="h-7 w-7" />
                        )}
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

            {/* New Sections: Specifications, Reviews, Related Products */}
            <div className="mt-32 space-y-24">
              {/* Trust Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
                {[
                  {
                    icon: TruckIcon,
                    title: "Free Shipping",
                    desc: "On all orders over ₹999",
                  },
                  {
                    icon: ShieldCheckIcon,
                    title: "Secure Payment",
                    desc: "100% protected payments",
                  },
                  {
                    icon: ArrowPathIcon,
                    title: "Easy Returns",
                    desc: "30-day money back guarantee",
                  },
                  {
                    icon: CheckBadgeIcon,
                    title: "Genuine Products",
                    desc: "100% authentic guaranteed",
                  },
                ].map((badge, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex flex-col items-center text-center cursor-pointer p-6 bg-white rounded-[2rem] premium-shadow border border-slate-100/50 hover:border-indigo-100 hover:shadow-indigo-100/50 transition-all group"
                  >
                    <div className="w-14 h-14 bg-slate-50 group-hover:bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300">
                      <badge.icon className="w-7 h-7 text-slate-400 group-hover:text-indigo-600 transition-colors duration-300" />
                    </div>
                    <h4 className="text-sm font-black text-slate-900 mb-1">
                      {badge.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                      {badge.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Specifications & Description Tabs */}
              {/* <div className="grid lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                    <span className="w-2 h-8 bg-indigo-600 rounded-full" />
                    Product Specifications
                  </h3>
                  <div className="bg-white rounded-[2.5rem] premium-shadow border border-slate-100 overflow-hidden">
                    <table className="w-full text-left">
                      <tbody>
                        {[
                          { label: "Brand", value: product.brand },
                          { label: "Category", value: product.category },
                          { label: "SKU", value: product.sku },
                          { label: "Weight", value: product.weight ? `${product.weight} kg` : null },
                          {
                            label: "Dimensions",
                            value: product.dimensions
                              ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`
                              : null,
                          },
                          { label: "Warranty", value: product.warrantyInformation },
                          { label: "Shipping", value: product.shippingInformation },
                          { label: "Return Policy", value: product.returnPolicy },
                        ]
                          .filter((spec) => spec.value && spec.value !== "N/A")
                          .map((spec, i) => (
                            <tr
                              key={i}
                              className={i % 2 === 0 ? "bg-slate-50/50" : "bg-white"}
                            >
                              <td className="py-5 px-8 text-sm font-bold text-slate-400 uppercase tracking-wider w-1/3">
                                {spec.label}
                              </td>
                              <td className="py-5 px-8 text-sm font-black text-slate-900 capitalize">
                                {spec.value}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                    <span className="w-2 h-8 bg-indigo-600 rounded-full" />
                    Reviews
                  </h3>
                  <div className="space-y-6">
                    {product.reviews && product.reviews.length > 0 ? (
                      product.reviews.map((review, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-bold text-slate-900 truncate max-w-[150px]">
                              {review.reviewerName}
                            </span>
                            <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg text-[10px] font-bold text-amber-700">
                              <StarIcon className="w-3 h-3 text-amber-500 fill-amber-500" />
                              {review.rating}.0
                            </div>
                          </div>
                          <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                            "{review.comment}"
                          </p>
                          <p className="text-[10px] text-slate-300 mt-3 font-bold uppercase tracking-widest">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400 text-sm font-bold italic text-center py-8">
                        No reviews yet for this product.
                      </p>
                    )}
                    <button className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 text-sm font-bold hover:border-indigo-300 hover:text-indigo-600 transition-all">
                      Write a Review
                    </button>
                  </div>
                </div>
              </div> */}

              {/* Related Products */}
              <div>
                <div className="flex items-end justify-between mb-10">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 mb-2 flex items-center gap-3">
                      <span className="w-2 h-10 bg-indigo-600 rounded-full" />
                      Related Products
                    </h3>
                    <p className="text-slate-500 font-medium">
                      You might also like these items from {product.category}
                    </p>
                  </div>
                  <Link
                    to="/"
                    className="text-indigo-600 font-bold hover:text-indigo-500 transition-colors flex items-center gap-2"
                  >
                    See All <span className="text-xl">→</span>
                  </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {relatedProducts
                    .filter((p) => p.id !== product.id)
                    .slice(0, 4)
                    .map((item) => (
                      <Link
                        key={item.id}
                        to={`/product-detail/${item.id}`}
                        className="group bg-white rounded-[2rem] premium-shadow premium-shadow-hover overflow-hidden transition-all"
                      >
                        <div className="aspect-h-1 aspect-w-1 overflow-hidden bg-slate-100">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6">
                          <h4 className="text-sm font-bold text-slate-900 mb-1 truncate group-hover:text-indigo-600">
                            {item.title}
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-black text-slate-900">
                              ₹
                              {Math.round(
                                discountedPrice(
                                  item.price,
                                  item.discountPercentage,
                                ),
                              )}
                            </span>
                            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg text-[10px] font-bold text-amber-700">
                              <StarIcon className="w-3 h-3 text-amber-500 fill-amber-500" />
                              {item.rating}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
