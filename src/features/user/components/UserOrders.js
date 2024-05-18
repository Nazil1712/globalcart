import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserordersAsync, selectUserorders } from "../userslice";
import { discountedPrice } from "../../../app/constants";

export default function Userorders() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const Userorders = useSelector(selectUserorders);
  console.log("USer,", loggedInUser);
  console.log(Userorders);

  useEffect(() => {
    dispatch(fetchUserordersAsync(loggedInUser.id));
  }, []);

  return (
    <div>
      {Userorders.map((order, index) => (
        <div>
          <div
            className={`mx-auto ${
              index === 0 ? "" : "mt-12"
            } bg-white max-w-7xl px-4 sm:px-6 lg:px-8`}
          >
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 mt-3">
                Order # {order.id}
              </h1>
              <h5 className="text-xl font-bold tracking-tight text-red-500 mt-3">
                Order Status : {order.status}
              </h5>
              <div className="flow-root mt-6">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.products.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={product.href}>{product.title}</a>
                            </h3>
                            <p className="ml-4">$ {discountedPrice(product.price, product.discountPercentage)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            Price per Item : $ {discountedPrice(product.price,product.discountPercentage)}
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            Qty : {product.quantity}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900 border-b py-3">
                <p>Total Items in Cart</p>
                <p>{order.totalItems} Items</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900 mt-3">
                <p>Subtotal</p>
                <p>$ {order.totalAmount}</p>
              </div>
            </div>
            <div className="border-t divide-gray-200 px-4 py-6 sm:px-6">
              <p className="text-gray-900 text-lg font-semibold">
                Selected Shipping Address
              </p>
              <div className="ml-6">
                <li className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.selectedAddress.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectedAddress.email}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectedAddress.phone}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {order.selectedAddress.city}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      {order.selectedAddress.street}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      {order.selectedAddress.pinCode}
                    </p>
                  </div>
                </li>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
