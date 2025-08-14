import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByIdAsync } from "../product/productslice";
import { useParams } from "react-router-dom";
import { addToCartAsync } from "../cart/cartslice";
import { discountedPrice } from "../../app/constants";
import { Bounce, Flip, ToastContainer, toast } from "react-toastify";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductdetailShimmer() {
  const notify = () =>
    toast.warn("Item Already Added!", {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });
  const cartItems = useSelector((state) => state.cart.items);
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.selectedProduct);

  const handleCart = (e) => {
    const index = cartItems.findIndex((item) => item.productId === product.id);

    if (index < 0) {
      // Means If Item Dosn't exist in Cart
      e.preventDefault();
      const newItem = {
        ...product,
        quantity: 1,
        productId: product.id,
      };
      // console.log(newItem);
      delete newItem["id"];
      dispatch(addToCartAsync(newItem));
      toast.success("Item Added In cart", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    } else {
      e.preventDefault();
      notify();
      // console.log("Item Already Added");
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(id));
  }, [dispatch, id]);

  return (
    <div className="bg-white">
      {product && (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div aria-current="page" className="w-60 h-5 bg-shimmer"></div>
            </ol>
          </nav>

          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img className="h-full w-full object-cover object-center bg-shimmer" />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img className="h-full w-full object-cover object-center bg-shimmer" />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img className="h-full w-full object-cover object-center bg-shimmer" />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img className="h-full w-full object-cover object-center bg-shimmer" />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="bg-shimmer w-96 h-10 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"></h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="bg-shimmer w-20 h-6 mb-5"></div>
              <h3 className="bg-shimmer w-40 h-10 text-sm font-medium text-gray-900"></h3>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">Rating out of 5 stars</p>
                </div>
              </div>

              <form className="mt-10">
                <div className="bg-shimmer w-80 h-10"></div>

                <ToastContainer
                  position="top-right"
                  autoClose={1000}
                  hideProgressBar
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="bg-shimmer w-full h-5 text-base text-gray-900"></p>
                  <p className="bg-shimmer w-full h-5 text-base text-gray-900"></p>
                  <p className="bg-shimmer w-full h-5 text-base text-gray-900"></p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="bg-shimmer w-60 h-10 text-sm font-medium text-gray-900"></h3>

                <div className="mt-4">
                  <ul className="list-disc space-y-2 pl-4 text-sm">
                    <li className="text-gray-400 bg-shimmer w-28 h-5"></li>
                    <li className="text-gray-400 bg-shimmer w-28 h-5"></li>
                    <li className="text-gray-400 bg-shimmer w-28 h-5"></li>
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900 bg-shimmer w-60 h-10"></h2>

                <div className="mt-4 space-y-6">
                  <p className="bg-shimmer w-96 h-5 text-base text-gray-900"></p>
                  <p className="bg-shimmer w-96 h-5 text-base text-gray-900"></p>
                  <p className="bg-shimmer w-96 h-5 text-base text-gray-900"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
