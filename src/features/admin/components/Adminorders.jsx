import { useEffect } from "react";
import { useState } from "react";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersAsync, updateOrderAsync } from "../../order/orderslice";
import {
  ArrowDownCircleIcon,
  ArrowDownIcon,
  ArrowUpCircleIcon,
  ArrowUpIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/16/solid";
import Pagination from "../../common/Pagination";

const Adminorders = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [sort, setSort] = useState({});
  const orders = useSelector((state) => state.order.orders);
  const totalOrders = useSelector((state) => state.order.totalOrders);
  const [editOrderId, setEditOrderId] = useState(-1);
  const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);

  // console.log("Orders",orders)

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  const handleEdit = (e, order) => {
    setEditOrderId(order.id);
  };

  const handleSort = (option) => {
    const newSort = { ...sort, _sort: option.sort, _order: option.order };
    setSort(newSort);
    // console.log(newSort);
    // console.log(option.sort, option.order);
  };

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditOrderId(-1);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const chooseColor = (staus) => {
    switch (staus) {
      case "pending":
        return `text-yellow-600 bg-yellow-500/20`;

      case "dispatched":
        return `text-blue-600 bg-blue-500/20`;

      case "delivered":
        return `text-green-600 bg-green-500/20`;

      case "cancelled":
        return `text-red-600 bg-red-500/20`;

      default:
        return `text-purple-600 bg-purple-500/20`;
    }
  };

  return (
    <div>
      <>
        <div className="p-6 px-0">
          <table className="mt-4 w-full min-w-max border-gray-200 bg-white table-auto text-left">
            <thead>
              <tr className="border-x border-y border-gray-200">
                <th
                  className="cursor-pointer border-x border-y border-gray-200 border-blue-gray-100 
                 bg-white p-4 transition-colors "
                  onClick={(e) =>
                    handleSort({
                      sort: "id",
                      order: sort._order === "asc" ? "desc" : "asc",
                    })
                  }
                >
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    Order #
                    {sort._sort === "id" &&
                      (sort._order === "asc" ? (
                        <ArrowDownIcon className="w-6 h-6 text-blue-600" />
                      ) : (
                        <ArrowUpIcon className="w-6 h-6 text-blue-600" />
                      ))}
                  </p>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 border-x  border-gray-200">
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    Items
                  </p>
                </th>
                <th
                  className="cursor-pointer border-x border-y border-gray-200 border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  onClick={(e) =>
                    handleSort({
                      sort: "totalAmount",
                      order: sort._order === "asc" ? "desc" : "asc",
                    })
                  }
                >
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    Total Amount
                    {sort._sort === "totalAmount" &&
                      (sort._order === "asc" ? (
                        <ArrowDownIcon className="w-6 h-6 text-blue-600" />
                      ) : (
                        <ArrowUpIcon className="w-6 h-6 text-blue-600" />
                      ))}
                  </p>
                </th>
                <th className="cursor-pointer border-x border-y border-gray-200 border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    Status{" "}
                  </p>
                </th>
                <th className="cursor-pointer border-x border-y border-gray-200 border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    User{" "}
                  </p>
                </th>
                <th className="cursor-pointer border-x border-y border-gray-200 border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    Actions
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, orderIndex, arr) => (
                <tr className="cursor-pointer border-x border-y border-gray-200 border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50" key={order.id}>
                  <td className="p-4 border-b border-blue-gray-50 border-x borde-y">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                          {order.id}
                        </p>
                        {/* <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                          Start date: 10 Dec 2023
                        </p> */}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 border-x borde-y">
                    {order.items.map((item, i, arr) => (
                      <div
                        className={`flex items-center gap-3 ${
                          i > 0 ? "mt-5" : null
                        }`}
                        key={item.id}
                      >
                        <img
                          src={item.product.thumbnail}
                          alt="John Michael"
                          className="inline-block relative object-cover object-center !rounded-full w-12 h-12"
                        />
                        <div className="flex flex-col">
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                            {item.product.title} (Qty : {item.quantity})
                          </p>
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                            ${" "}
                            {discountedPrice(
                              item.product.price,
                              item.product.discountPercentage
                            )}
                          </p>
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                            Net Amt :{" "}
                            {discountedPrice(
                              item.product.price,
                              item.product.discountPercentage
                            )}{" "}
                            x {item.quantity} ={" "}
                            {discountedPrice(
                              item.product.price,
                              item.product.discountPercentage
                            ) * item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 border-x borde-y">
                    <div className="flex flex-col">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        $ {order.totalAmount}
                      </p>
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                        Total Items = {order.totalItems}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 border-x borde-y">
                    <div className="w-max">
                      {order.id === editOrderId ? (
                        <select
                          className="relative items-center font-sans uppercase select-none py-1 px-2 text-xs rounded-md min-w-32"
                          onChange={(e) => handleUpdate(e, order)}
                        >
                          <option value={"Select"}>Select Status</option>
                          <option value={"pending"}>Pending</option>
                          <option value={"dispatched"}>Dispatched</option>
                          <option value={"delivered"}>Delivered</option>
                          <option value={"cancelled"}>Cancelled</option>
                        </select>
                      ) : (
                        /* ${
                            order.status === "pending"
                              ? "text-red-600 bg-red-500/20"
                              : "text-green-600 bg-green-500/20"
                          } */
                        <div
                          className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none ${chooseColor(
                            order.status
                          )} py-1 px-2 text-xs rounded-md`}
                          style={{ opacity: 1 }}
                        >
                          <span className="">{order.status}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 border-x borde-y">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                      <span className="font-bold">User Name : </span>
                      {order.selectedAddress.name} <br />
                      <span className="font-bold">Email : </span>
                      {order.selectedAddress.email}
                    </p>
                  </td>
                  <td className="p-4 border-b text-gray-500 border-x borde-y">
                    <div>
                      <EyeIcon className="w-7 h-8 cursor-pointer text-teal-500 hover:text-teal-700" />
                    </div>
                    <div>
                      <PencilIcon
                        className="w-7 h-8 cursor-pointer text-yellow-500 hover:text-yellow-700"
                        onClick={(e) => handleEdit(e, order)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={totalOrders}
          totalPages={totalPages}
        />
      </>
    </div>
  );
};

export default Adminorders;
