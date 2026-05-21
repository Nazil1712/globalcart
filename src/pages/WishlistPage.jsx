import { useDispatch, useSelector } from "react-redux";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import { deleteFromWishlistAsync } from "../features/wishlist/wishlistSlice";
import {
  addToCartAsync,
  updateCartAsync,
  deleteFromCartAsync,
} from "../features/cart/cartSlice";
import { discountedPrice, formatPrice } from "../app/constants";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  TrashIcon,
  ShoppingBagIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { useState } from "react";
import PopupBox from "../features/common/Dialog";

function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);
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
    toast.success("Item Added In cart");
  };

  const handleQuantity = (newQty, item) => {
    if (newQty > 0 && newQty <= 10) {
      dispatch(updateCartAsync({ id: item.id, quantity: newQty }));
    } else if (newQty === 0) {
      dispatch(deleteFromCartAsync(item.id));
    }
  };

  console.log("WIshLIst Items", wishlistItems);

  return (
    <div className="bg-slate-50/50 min-h-screen">
      <Navbar>
        <div className="py-8 md:py-12">
          <div className="flex flex-row items-center justify-between mb-8 md:mb-12 gap-3 md:gap-6">
            <div className="text-left">
              <span className="inline-flex items-center gap-1.5 md:gap-2 bg-indigo-50 border border-indigo-100 px-2 md:px-3 py-1 imged-full text-[8px] md:text-[10px] rounded-2xl font-black text-indigo-600 tracking-widest uppercase mb-2 md:mb-3">
                Your Collection
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-2 flex items-center justify-start gap-2 md:gap-3">
                <span className="w-1.5 md:w-2 h-6 sm:h-8 md:h-10 bg-indigo-600 rounded-full" />
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
              className="bg-white text-slate-700 px-3 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-xs sm:text-sm font-bold border border-slate-200 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm shrink-0"
            >
              <span className="flex flex-col md:flex-row md:gap-1">
                {" "}
                <span>Continue</span> <span>Shopping</span>
              </span>
            </Link>
          </div>

          {wishlistItems?.length === 0 ? (
            <div className="text-center py-16 md:py-24 bg-white rounded-[2rem] md:rounded-[3rem] premium-shadow border border-slate-100/50 px-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
                <HeartIcon className="w-8 h-8 md:w-10 md:h-10 text-slate-300" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-sm md:text-base text-slate-500 font-medium mb-8 md:mb-10 max-w-sm mx-auto">
                Add items that you like to your wishlist to see them here and
                track them.
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-3.5 md:px-10 md:py-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold shadow-2xl shadow-indigo-200 hover:bg-indigo-500 transition-all uppercase tracking-wider"
              >
                Go Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-2 md:px-0">
              <AnimatePresence>
                {wishlistItems?.map((item) => {
                  const product = item.product;
                  if (!product) return null;
                  const cartItem = cartItems?.find(
                    (cItem) => cItem.product.id === product.id,
                  );

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="group bg-white rounded-3xl md:rounded-[2.5rem] premium-shadow premium-shadow-hover overflow-hidden transition-all flex flex-col border border-slate-100/50 relative"
                    >
                      <div className="aspect-h-1 aspect-w-1 overflow-hidden bg-slate-50 relative">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 md:p-6 flex-1 flex flex-col">
                        <Link
                          to={`/product-detail/${product.id}`}
                          className="flex-1"
                        >
                          <span className="text-[9px] md:text-[10px] font-black text-indigo-600 uppercase tracking-wider block mb-1">
                            {product.category}
                          </span>
                          <h4 className="text-sm md:text-base font-bold text-slate-900 mb-1 md:mb-2 line-clamp-2 md:line-clamp-1 group-hover:text-indigo-600 transition-colors min-h-[40px] md:min-h-0">
                            {product.title}
                          </h4>

                          <div className="flex flex-wrap items-baseline gap-1 md:gap-2 mb-3 md:mb-4">
                            <span className="text-base md:text-xl font-black text-slate-900">
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
                              <span className="text-[10px] md:text-sm text-slate-400 line-through font-medium">
                                ₹
                                {formatPrice(
                                  Math.round(product.price * exchangeRate),
                                )}
                              </span>
                            )}
                            {product.discountPercentage > 0 && (
                              <span className="text-[9px] md:text-xs text-green-600 font-bold md:ml-1 w-full md:w-auto mt-0.5 md:mt-0">
                                ({product.discountPercentage}% OFF)
                              </span>
                            )}
                          </div>
                        </Link>

                        <div className="flex flex-row gap-2 md:gap-3 mt-auto">
                          {cartItem ? (
                            <div className="flex-1 flex items-center justify-between border border-slate-200 rounded-lg md:rounded-xl overflow-hidden bg-slate-50">
                              <button
                                onClick={() =>
                                  handleQuantity(
                                    cartItem.quantity - 1,
                                    cartItem,
                                  )
                                }
                                className="p-2 md:p-3 hover:bg-slate-100 transition-colors"
                              >
                                <MinusIcon className="w-3 h-3 md:w-4 md:h-4 text-slate-600" />
                              </button>
                              <span className="px-2 md:px-3 font-bold text-slate-900 text-xs md:text-sm">
                                {cartItem.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantity(
                                    cartItem.quantity + 1,
                                    cartItem,
                                  )
                                }
                                className="p-2 md:p-3 hover:bg-slate-100 transition-colors disabled:opacity-50"
                                disabled={cartItem.quantity >= 10}
                              >
                                <PlusIcon className="w-3 h-3 md:w-4 md:h-4 text-slate-600" />
                              </button>
                            </div>
                          ) : (
                            <motion.button
                              whileHover={{
                                scale: 1.02,
                                backgroundColor: "#4f46e5",
                              }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleAddToCart(product)}
                              className="flex-1 bg-indigo-600 text-white px-2 md:px-4 py-2.5 md:py-3.5 rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all flex items-center justify-center gap-1.5 md:gap-2"
                            >
                              <ShoppingBagIcon className="w-3 h-3 md:w-4 md:h-4" />
                              <span className="hidden sm:inline">
                                Add to Cart
                              </span>
                              <span className="sm:hidden">Add</span>
                            </motion.button>
                          )}
                          <button
                            onClick={() => setItemToRemove(product.id)}
                            className="p-2.5 md:p-3.5 bg-white text-slate-400 hover:text-red-500 hover:border-red-200 transition-all border border-slate-200 rounded-lg md:rounded-xl shadow-sm"
                          >
                            <TrashIcon className="w-4 h-4 md:w-5 md:h-5" />
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
