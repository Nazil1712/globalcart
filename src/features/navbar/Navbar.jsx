import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import globalcart from "../../images/gc.png";
import NavbarShimmer from "../shimmer/NavbarShimmer";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIM54VJaavVOZrtYjjS7NGrFK8i-FzlXb94g&s",
};
const navigation = [
  { name: "Home", href: "/", user: true, admin: true },
  { name: "Admin Panel", href: "/admin", admin: true },
  { name: "Orders", href: "/admin/orders", admin: true },
  { name: "About Us", href: "/about-us", user: true, admin: true },
  { name: "Contact Us", href: "/contact-us", user: true, admin: true },
];
const userNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/orders" },
  { name: "Sign out", link: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ children }) => {
  const items = useSelector((state) => state.cart.items);
  const totalItems = items.reduce(
    (prevCount, item) => item.quantity + prevCount,
    0,
  );
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const userInfo = useSelector((state) => state.user.userInfo);
  const itemStatus = useSelector((state) => state.cart.status);
  const userChecked = useSelector((state) => state.auth.userChecked);
  const location = useLocation();

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (itemStatus !== "loading") {
      setIsInitialLoad(false);
    }
  }, [itemStatus]);

  const publicNavigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const navItems = userInfo
    ? navigation.filter((item) => item[userInfo.role])
    : publicNavigation;

  return (
    <div className="bg-slate-50/50">
      {isInitialLoad && itemStatus === "loading" ? (
        <NavbarShimmer />
      ) : (
        <>
          <Disclosure as="nav" className="sticky top-0 z-50 glass">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-20 items-center justify-between">
                    <div className="flex items-center gap-8">
                      <Link to="/" className="flex-shrink-0 group">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="h-12 w-auto"
                          src={globalcart}
                          alt="GlobalCart"
                        />
                      </Link>
                      <div className="hidden md:block">
                        <div className="flex items-center space-x-1">
                          {navItems.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className={classNames(
                                location.pathname === item.href
                                  ? "bg-indigo-50 text-indigo-600"
                                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                                "rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200",
                              )}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6 gap-4">
                        {userInfo ? (
                          <>
                            <Link to="/wishlist" className="relative group p-2">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-slate-600 group-hover:text-indigo-600 transition-colors"
                              >
                                <HeartIcon className="h-7 w-7" />
                              </motion.div>
                              <AnimatePresence>
                                {wishlistItems?.length > 0 && (
                                  <motion.span
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white"
                                  >
                                    {wishlistItems.length}
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </Link>

                            <Link to="/cart" className="relative group p-2">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-slate-600 group-hover:text-indigo-600 transition-colors"
                              >
                                <ShoppingCartIcon className="h-7 w-7" />
                              </motion.div>
                              <AnimatePresence>
                                {totalItems > 0 && (
                                  <motion.span
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white"
                                  >
                                    {totalItems}
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </Link>

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                              <Menu.Button className="flex items-center rounded-full bg-white p-0.5 ring-2 ring-slate-200 hover:ring-indigo-300 transition-all overflow-hidden">
                                <img
                                  className="h-9 w-9 rounded-full object-cover"
                                  src={user.imageUrl}
                                  alt=""
                                />
                              </Menu.Button>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="transform opacity-0 scale-95 translate-y-2"
                                enterTo="transform opacity-100 scale-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="transform opacity-100 scale-100 translate-y-0"
                                leaveTo="transform opacity-0 scale-95 translate-y-2"
                              >
                                <Menu.Items className="absolute right-0 z-10 mt-3 w-56 origin-top-right rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-slate-200 focus:outline-none">
                                  <div className="px-3 py-2 mb-2 border-b border-slate-100">
                                    <p className="text-sm font-bold text-slate-900">
                                      {userInfo.name || "User"}
                                    </p>
                                    <p className="text-xs text-slate-500 truncate">
                                      {userInfo.email}
                                    </p>
                                  </div>
                                  {userNavigation.map((item) => (
                                    <Menu.Item key={item.name}>
                                      {({ active }) => (
                                        <Link
                                          to={item.link}
                                          className={classNames(
                                            active
                                              ? "bg-indigo-50 text-indigo-600"
                                              : "text-slate-700",
                                            "flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                                          )}
                                        >
                                          {item.name}
                                        </Link>
                                      )}
                                    </Menu.Item>
                                  ))}
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </>
                        ) : !userChecked ? (
                          <div className="w-20 h-9 bg-slate-200 animate-pulse rounded-xl" />
                        ) : (
                          " "
                        )}
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all">
                        {open ? (
                          <XMarkIcon className="block h-7 w-7" />
                        ) : (
                          <Bars3Icon className="block h-7 w-7" />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {open && (
                    <Disclosure.Panel
                      static
                      as={motion.div}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="md:hidden border-t border-slate-100 overflow-hidden bg-white/80 backdrop-blur-lg"
                    >
                      <div className="space-y-1 px-4 pb-6 pt-4">
                        {navItems.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as={Link}
                            to={item.href}
                            className={classNames(
                              location.pathname === item.href
                                ? "bg-indigo-50 text-indigo-600"
                                : "text-slate-600 hover:bg-slate-50",
                              "block rounded-xl px-4 py-3 text-base font-bold transition-all",
                            )}
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </div>
                      <div className="border-t border-slate-100 pb-6 pt-4 px-4">
                        {userInfo ? (
                          <>
                            <div className="flex items-center px-2 mb-4">
                              <img
                                className="h-11 w-11 rounded-full border-2 border-indigo-100"
                                src={user.imageUrl}
                                alt=""
                              />
                              <div className="ml-3">
                                <div className="text-base font-bold text-slate-900">
                                  {userInfo.name || "User"}
                                </div>
                                <div className="text-sm font-medium text-slate-500">
                                  {userInfo.email}
                                </div>
                              </div>
                              <Link
                                to="/wishlist"
                                className="ml-auto relative p-2"
                              >
                                <HeartIcon className="h-7 w-7 text-slate-600" />
                                {wishlistItems?.length > 0 && (
                                  <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                                    {wishlistItems.length}
                                  </span>
                                )}
                              </Link>
                              <Link to="/cart" className="relative p-2">
                                <ShoppingCartIcon className="h-7 w-7 text-slate-600" />
                                {totalItems > 0 && (
                                  <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                                    {totalItems}
                                  </span>
                                )}
                              </Link>
                            </div>
                            <div className="space-y-1">
                              {userNavigation.map((item) => (
                                <Disclosure.Button
                                  key={item.name}
                                  as={Link}
                                  to={item.link}
                                  className="block rounded-xl px-4 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                                >
                                  {item.name}
                                </Disclosure.Button>
                              ))}
                            </div>
                          </>
                        ) : !userChecked ? (
                          <div className="w-full h-12 bg-slate-200 animate-pulse rounded-xl" />
                        ) : (
                          <Link
                            to="/login"
                            className="block text-center bg-indigo-600 text-white px-4 py-3 rounded-xl text-base font-bold hover:bg-indigo-500 transition-all"
                          >
                            Login
                          </Link>
                        )}
                      </div>
                    </Disclosure.Panel>
                  )}
                </AnimatePresence>
              </>
            )}
          </Disclosure>

          <main className="relative">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default Navbar;
