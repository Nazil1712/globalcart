import { useDispatch, useSelector } from "react-redux";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import { deleteFromWishlistAsync } from "../features/wishlist/wishlistSlice";
import { addToCartAsync } from "../features/cart/cartSlice";
import { discountedPrice, formatPrice } from "../app/constants";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  TrashIcon,
  ShoppingBagIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { useState } from "react";
import PopupBox from "../features/common/Dialog";

function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const exchangeRate = useSelector((state) => state.product.exchangeRate) || 1;
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleRemove = (productId) => {
    dispatch(deleteFromWishlistAsync(productId));
    setItemToRemove(null);
  };

  const handleAddToCart = (product) => {
    const newItem = {
      quantity: 1,
      product: product.id,
    };
    dispatch(addToCartAsync(newItem));
    dispatch(deleteFromWishlistAsync(product.id));
    toast.success("Item Added In cart");
  };

  console.log("WIshLIst Items", wishlistItems);

  return (
    <div className="bg-slate-50/50 min-h-screen">
      <Navbar>
        <div className="py-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div>
              <span className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3 py-1 imged-full text-[10px] rounded-2xl font-black text-indigo-600 tracking-widest uppercase mb-3">
                Your Collection
              </span>
              <h1 className="text-5xl font-black text-slate-900 mb-2 flex items-center gap-3">
                <span className="w-2 h-10 bg-indigo-600 rounded-full" />
                My Wishlist
              </h1>
              {wishlistItems?.length > 0 ? (
                <p className="text-slate-500 font-medium">
                  You have saved {wishlistItems?.length || 0} premium item
                  {wishlistItems.length > 1 ? "s" : " "}
                </p>
              ) : (
                " "
              )}
            </div>
            <Link
              to="/"
              className="bg-white text-slate-700 px-6 py-3 rounded-2xl text-sm font-bold border border-slate-200 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm"
            >
              Continue Shopping
            </Link>
          </div>

          {wishlistItems?.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[3rem] premium-shadow border border-slate-100/50">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
                <HeartIcon className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-slate-500 font-medium mb-10 max-w-sm mx-auto">
                Add items that you like to your wishlist to see them here and
                track them.
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center bg-indigo-600 text-white px-10 py-4 rounded-2xl text-sm font-bold shadow-2xl shadow-indigo-200 hover:bg-indigo-500 transition-all uppercase tracking-wider"
              >
                Go Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <AnimatePresence>
                {wishlistItems?.map((item) => {
                  const product = item.product;
                  if (!product) return null;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="group bg-white rounded-[2.5rem] premium-shadow premium-shadow-hover overflow-hidden transition-all flex flex-col border border-slate-100/50 relative"
                    >
                      <div className="aspect-h-1 aspect-w-1 overflow-hidden bg-slate-50 relative">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <Link
                          to={`/product-detail/${product.id}`}
                          className="flex-1"
                        >
                          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider block mb-1">
                            {product.category}
                          </span>
                          <h4 className="text-base font-bold text-slate-900 mb-2 truncate group-hover:text-indigo-600 transition-colors">
                            {product.title}
                          </h4>

                          <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-xl font-black text-slate-900">
                              ₹
                              {formatPrice(
                                Math.round(
                                  discountedPrice(
                                    product.price,
                                    product.discountPercentage,
                                  ) * exchangeRate,
                                ),
                              )}
                            </span>
                            {product.discountPercentage > 0 && (
                              <span className="text-sm text-slate-400 line-through font-medium">
                                ₹
                                {formatPrice(
                                  Math.round(product.price * exchangeRate),
                                )}
                              </span>
                            )}
                            {product.discountPercentage > 0 && (
                              <span className="text-xs text-green-600 font-bold ml-1">
                                ({product.discountPercentage}% OFF)
                              </span>
                            )}
                          </div>
                        </Link>

                        <div className="flex gap-3 mt-auto">
                          <motion.button
                            whileHover={{
                              scale: 1.02,
                              backgroundColor: "#4f46e5",
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleAddToCart(product)}
                            className="flex-1 bg-indigo-600 text-white px-4 py-3.5 rounded-xl text-xs font-bold shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2"
                          >
                            <ShoppingBagIcon className="w-4 h-4" />
                            Add to Cart
                          </motion.button>
                          <button
                            onClick={() => setItemToRemove(product.id)}
                            className="p-3.5 bg-white text-slate-400 hover:text-red-500 hover:border-red-200 transition-all border border-slate-200 rounded-xl shadow-sm"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </Navbar>
      <Footer />

      {/* Popup for removal */}
      <PopupBox
        title="Remove from Wishlist"
        message="Are you sure you want to remove this item from your wishlist?"
        dangerOption="Remove"
        cancelOption="Cancel"
        dangerAction={() => handleRemove(itemToRemove)}
        cancleAction={() => setItemToRemove(null)}
        showPopUp={itemToRemove !== null}
      />
    </div>
  );
}

export default WishlistPage;
