import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersAsync, updateOrderAsync } from "../../order/orderSlice";
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

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return `text-amber-600 bg-amber-50 border-amber-100`;
      case "dispatched":
        return `text-indigo-600 bg-indigo-50 border-indigo-100`;
      case "delivered":
        return `text-emerald-600 bg-emerald-50 border-emerald-100`;
      case "cancelled":
        return `text-rose-600 bg-rose-50 border-rose-100`;
      default:
        return `text-slate-600 bg-slate-50 border-slate-100`;
    }
  };

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-12 flex justify-between items-end">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-black text-slate-900 tracking-tight"
            >
              Order Management
            </motion.h1>
            <p className="mt-2 text-slate-500 font-medium">Monitor and update customer orders globally</p>
          </div>
          <div className="glass px-6 py-3 rounded-2xl flex items-center gap-4 border border-white">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Orders</span>
            <span className="text-2xl font-black text-indigo-600">{totalOrders}</span>
          </div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] premium-shadow overflow-hidden border border-slate-100"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-indigo-600 transition-colors"
                      onClick={() => handleSort({ sort: "id", order: sort._order === "asc" ? "desc" : "asc" })}>
                    <div className="flex items-center gap-2">
                      Order ID
                      {sort._sort === "id" && (sort._order === "asc" ? <ArrowDownIcon className="w-4 h-4" /> : <ArrowUpIcon className="w-4 h-4" />)}
                    </div>
                  </th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Items</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-indigo-600 transition-colors"
                      onClick={() => handleSort({ sort: "totalAmount", order: sort._order === "asc" ? "desc" : "asc" })}>
                    <div className="flex items-center gap-2">
                      Amount
                      {sort._sort === "totalAmount" && (sort._order === "asc" ? <ArrowDownIcon className="w-4 h-4" /> : <ArrowUpIcon className="w-4 h-4" />)}
                    </div>
                  </th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Customer</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence>
                  {orders.map((order, i) => (
                    <motion.tr 
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="p-6">
                        <span className="font-mono text-sm font-bold text-slate-400">#{order.id.slice(-6)}</span>
                      </td>
                      <td className="p-6">
                        <div className="flex -space-x-3 overflow-hidden">
                          {order.items.map((item, idx) => (
                            <img
                              key={idx}
                              src={item.product.thumbnail}
                              alt=""
                              className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                              title={`${item.product.title} (x${item.quantity})`}
                            />
                          ))}
                          {order.items.length > 3 && (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 ring-2 ring-white text-[10px] font-black text-slate-500">
                              +{order.items.length - 3}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-6">
                        <p className="text-sm font-black text-slate-900">${order.totalAmount}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{order.totalItems} items</p>
                      </td>
                      <td className="p-6">
                        {order.id === editOrderId ? (
                          <select
                            className="bg-slate-50 border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600 transition-all py-1.5 px-3"
                            onChange={(e) => handleUpdate(e, order)}
                            defaultValue={order.status}
                          >
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${chooseColor(order.status)}`}>
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="p-6">
                        <p className="text-sm font-bold text-slate-900">{order.selectedAddress.name}</p>
                        <p className="text-xs font-medium text-slate-400">{order.selectedAddress.email}</p>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg bg-slate-100 text-slate-400 hover:bg-indigo-600 hover:text-white transition-all"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleEdit(e, order)}
                            className="p-2 rounded-lg bg-slate-100 text-slate-400 hover:bg-indigo-600 hover:text-white transition-all"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="mt-12">
          <Pagination
            page={page}
            setPage={setPage}
            handlePage={handlePage}
            totalItems={totalOrders}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default Adminorders;
