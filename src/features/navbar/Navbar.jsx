import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  UserCircleIcon,
  HomeIcon,
  ClipboardDocumentListIcon,
  Squares2X2Icon,
  UserIcon,
  ShoppingBagIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  ArrowLeftOnRectangleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCategoriesAsync, setSearchQuery } from "../product/productSlice";
import globalcart from "../../images/gc.png";
import NavbarShimmer from "../shimmer/NavbarShimmer";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");
  const categories = useSelector((state) => state.product.categories);
  const searchQuery = useSelector((state) => state.product.searchQuery) || "";

  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [isCategoriesDrawerOpen, setIsCategoriesDrawerOpen] = useState(false);

  useEffect(() => {
    if (isCategoriesDrawerOpen && (!categories || categories.length === 0)) {
      dispatch(fetchAllCategoriesAsync());
    }
  }, [isCategoriesDrawerOpen, categories, dispatch]);

  const [showMobileNav, setShowMobileNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
          setShowMobileNav(false);
        } else {
          setShowMobileNav(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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

  // console.log("User Info", userInfo);

  return (
    <div className="bg-slate-50/50">
      {isInitialLoad && itemStatus === "loading" ? (
        <NavbarShimmer />
      ) : (
        <>
          <Disclosure as="nav" className="sticky top-0 z-50 glass hidden md:block">
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
                                "rounded-xl px-4 py-2 text-base font-semibold transition-all duration-200",
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
                                {userInfo?.name ? (
                                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold shadow-sm">
                                    {userInfo.name[0].toUpperCase()}
                                  </div>
                                ) : (
                                  <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                    <UserCircleIcon className="w-6 h-6" />
                                  </div>
                                )}
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
                              {userInfo?.name ? (
                                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-base font-bold border-2 border-white shadow-sm">
                                  {userInfo.name[0].toUpperCase()}
                                </div>
                              ) : (
                                <div className="h-11 w-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border-2 border-white">
                                  <UserCircleIcon className="w-7 h-7" />
                                </div>
                              )}
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

          {/* Mobile Sticky Top Header */}
          <motion.div 
            initial={{ y: 0 }}
            animate={{ y: showMobileNav ? 0 : "-100%" }}
            transition={{ duration: 0.3 }}
            className="sticky top-0 z-50 flex flex-col md:hidden w-full shadow-sm"
          >
            <div className="glass flex h-16 items-center justify-between px-4 sm:px-6 border-b border-slate-100">
            <Link to="/" className="flex-shrink-0 group">
              <motion.img
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-10 w-auto"
                src={globalcart}
                alt="GlobalCart"
              />
            </Link>
            
            {/* Profile Avatar Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsProfileDrawerOpen(true)}
              className="flex items-center rounded-full bg-white p-0.5 ring-2 ring-slate-200 focus:outline-none overflow-hidden cursor-pointer"
            >
              {userInfo?.name ? (
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                  {userInfo.name[0].toUpperCase()}
                </div>
              ) : (
                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <UserCircleIcon className="w-5 h-5" />
                </div>
              )}
            </motion.button>
            </div>
            
            {/* Mobile Search Bar */}
            <div className="bg-white px-4 py-3 border-b border-slate-100 shadow-sm">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  placeholder="Search products..."
                  className="w-full bg-slate-100/80 border-none rounded-xl px-4 py-2.5 pl-10 text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </motion.div>

          {/* Mobile Bottom Navigation Bar */}
          <motion.div 
            initial={{ y: 0 }}
            animate={{ y: showMobileNav ? 0 : "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white opacity-100 border-t border-slate-100 rounded-t-[2.5rem] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] flex justify-around items-center h-20 px-2"
            style={{ paddingBottom: "calc(8px + env(safe-area-inset-bottom, 0px))" }}
          >
            {[
              { name: "Home", href: "/", icon: HomeIcon },
              { name: "Orders", href: "/orders", icon: ClipboardDocumentListIcon },
              { name: "Categories", action: "categories", icon: Squares2X2Icon },
              { name: "Cart", href: "/cart", icon: ShoppingCartIcon, badge: totalItems },
              { name: "Wishlist", href: "/wishlist", icon: HeartIcon, badge: wishlistItems?.length },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.action === "categories" 
                ? isCategoriesDrawerOpen || !!activeCategory
                : tab.href === "/" 
                  ? (location.pathname === "/" || location.pathname === "/home") && !activeCategory
                  : location.pathname === tab.href;

              const content = (
                <div className="flex flex-col items-center justify-center gap-1 w-full relative">
                  <div className="relative flex items-center justify-center">
                    <Icon className={`h-6 w-6 transition-all duration-200 ${isActive ? "text-indigo-600 scale-110 stroke-2" : "text-slate-400"}`} />
                    {/* Badge */}
                    {tab.badge > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white ring-1 ring-white">
                        {tab.badge}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] tracking-wide transition-all duration-200 ${isActive ? "text-indigo-600 font-extrabold scale-105" : "text-slate-400 font-medium"}`}>
                    {tab.name}
                  </span>
                </div>
              );

              if (tab.action === "categories") {
                return (
                  <button
                    key={tab.name}
                    onClick={() => setIsCategoriesDrawerOpen(true)}
                    className="flex-1 py-2 focus:outline-none flex justify-center cursor-pointer"
                  >
                    {content}
                  </button>
                );
              }

              return (
                <Link
                  key={tab.name}
                  to={tab.href}
                  className="flex-1 py-2 flex justify-center"
                >
                  {content}
                </Link>
              );
            })}
          </motion.div>

          {/* Profile Side Drawer */}
          <AnimatePresence>
            {isProfileDrawerOpen && (
              <div className="fixed inset-0 z-50 md:hidden">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsProfileDrawerOpen(false)}
                  className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                />
                
                {/* Drawer Content */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="absolute right-0 top-0 bottom-0 w-80 bg-white/90 backdrop-blur-2xl border-l border-white/30 shadow-[0_0_50px_0_rgba(0,0,0,0.15)] flex flex-col p-6 z-50"
                >
                  {/* Close button */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-base font-extrabold tracking-tight text-slate-800">Account Options</span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsProfileDrawerOpen(false)}
                      className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </motion.button>
                  </div>

                  {/* Profile Summary Card */}
                  {userInfo ? (
                    <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/50 border border-indigo-100/50 p-5 rounded-3xl mb-8 flex items-center gap-4">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-500/20">
                        {userInfo?.name ? userInfo.name[0].toUpperCase() : "U"}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-lg font-black text-slate-800 leading-tight truncate">
                          {userInfo.name || "User"}
                        </p>
                        <p className="text-xs font-semibold text-slate-400 truncate mt-1">
                          {userInfo.email}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-8">
                      <Link
                        to="/login"
                        onClick={() => setIsProfileDrawerOpen(false)}
                        className="block text-center bg-indigo-600 text-white px-4 py-3 rounded-2xl text-base font-bold hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all"
                      >
                        Sign In / Login
                      </Link>
                    </div>
                  )}

                  {/* Navigation Links */}
                  <div className="flex-1 space-y-2 overflow-y-auto pr-1 no-scrollbar">
                    {[
                      { name: "My Profile", href: "/profile", icon: UserIcon },
                      { name: "My Orders", href: "/orders", icon: ShoppingBagIcon },
                      { name: "About Us", href: "/about-us", icon: InformationCircleIcon },
                      { name: "Contact Us", href: "/contact-us", icon: EnvelopeIcon },
                    ].map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.name}
                          to={link.href}
                          onClick={() => setIsProfileDrawerOpen(false)}
                          className="flex items-center justify-between p-3.5 rounded-2xl text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-bold">{link.name}</span>
                          </div>
                          <ChevronRightIcon className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                        </Link>
                      );
                    })}
                  </div>

                  {/* Logout/Sign Out Button */}
                  {userInfo && (
                    <div className="border-t border-slate-100 pt-6 mt-auto">
                      <Link
                        to="/logout"
                        onClick={() => setIsProfileDrawerOpen(false)}
                        className="flex items-center justify-between p-3.5 rounded-2xl text-red-500 hover:bg-red-50/50 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-50 rounded-xl group-hover:bg-red-100/50 transition-all">
                            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                          </div>
                          <span className="text-sm font-bold">Sign Out</span>
                        </div>
                        <ChevronRightIcon className="w-4 h-4 text-red-400 group-hover:text-red-500 transition-colors" />
                      </Link>
                    </div>
                  )}
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Categories Bottom Sheet */}
          <AnimatePresence>
            {isCategoriesDrawerOpen && (
              <div className="fixed inset-0 z-50 md:hidden flex items-end">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsCategoriesDrawerOpen(false)}
                  className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                />
                
                {/* Drawer Content */}
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 220 }}
                  className="relative w-full bg-white/95 backdrop-blur-2xl border-t border-white/40 rounded-t-[2.5rem] shadow-[0_-15px_40px_-10px_rgba(0,0,0,0.15)] flex flex-col p-6 z-50 max-h-[80vh] overflow-hidden"
                >
                  {/* Drag/Slight indicator handle */}
                  <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />

                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-extrabold tracking-tight text-slate-800">Shop by Category</h2>
                      <p className="text-xs font-semibold text-slate-400 mt-1">Select a category to filter products</p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsCategoriesDrawerOpen(false)}
                      className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </motion.button>
                  </div>

                  {/* Grid of categories */}
                  <div className="flex-1 overflow-y-auto pr-1 space-y-3 no-scrollbar pb-10">
                    <div className="grid grid-cols-2 gap-3">
                      {/* All Categories Button */}
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsCategoriesDrawerOpen(false);
                          navigate("/");
                        }}
                        className={`flex flex-col items-center justify-center p-4 rounded-3xl border text-center transition-all cursor-pointer ${
                          !activeCategory
                            ? "bg-gradient-to-br from-indigo-50 to-indigo-100/30 border-indigo-400/60 shadow-lg shadow-indigo-100/50"
                            : "bg-slate-50/80 border-slate-100 hover:bg-slate-100/50"
                        }`}
                      >
                        <div className={`p-2.5 rounded-2xl mb-2 ${!activeCategory ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-600"}`}>
                          <Squares2X2Icon className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-extrabold text-slate-800">All Products</span>
                      </motion.button>

                      {categories?.map((cat) => {
                        const catValue = typeof cat === "object" ? cat.value : cat;
                        const catLabel = typeof cat === "object" ? cat.label : cat;
                        const isCatActive = activeCategory === catValue;
                        
                        const formatCategoryName = (name) => {
                          return name
                            .split("-")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ");
                        };

                        return (
                          <motion.button
                            key={catValue}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setIsCategoriesDrawerOpen(false);
                              navigate(`/?category=${catValue}`);
                            }}
                            className={`flex flex-col items-center justify-center p-4 rounded-3xl border text-center transition-all cursor-pointer ${
                              isCatActive
                                ? "bg-gradient-to-br from-indigo-50 to-indigo-100/30 border-indigo-400/60 shadow-lg shadow-indigo-100/50"
                                : "bg-slate-50/80 border-slate-100 hover:bg-slate-100/50"
                            }`}
                          >
                            <div className={`p-2.5 rounded-2xl mb-2 ${isCatActive ? "bg-indigo-600 text-white animate-pulse" : "bg-slate-100 text-slate-500"}`}>
                              <Squares2X2Icon className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-black text-slate-800 tracking-tight leading-tight truncate w-full">
                              {formatCategoryName(catLabel)}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <main className="relative pb-24 md:pb-0">
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
