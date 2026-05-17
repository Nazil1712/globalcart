import { useDispatch, useSelector } from "react-redux";
import { discountedPrice, ITEMS_PER_PAGE } from "../../../app/constants";
import Pagination from "../../common/Pagination";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import {
  fetchAllBrandsAsync,
  fetchAllCategoriesAsync,
  fetchProductsByFilterAsync,
} from "../productSlice";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Productlist() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const totalItems = useSelector((state) => state.product.totalItems);
  const categories = useSelector((state) => state.product.categories);
  const brands = useSelector((state) => state.product.brands);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
  ];

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProductsByFilterAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
    dispatch(fetchAllBrandsAsync());
  }, []);

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    const checked = e.target.checked;

    // console.log(section);

    // section.id = category
    // opton.id = smartphone
    if (checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value,
      );
      newFilter[section.id].splice(index, 1);
      console.log("==>", newFilter[section.id].length);
    }

    // console.log("Filter",filter)
    console.log("New Filter", newFilter);

    setFilter(newFilter);
    // dispatch(fetchProductsByFilterAsync(newFilter));
  };

  const handleSort = (option) => {
    if (sort._sort === option.sort && sort._order === option.order) {
      // Toggle off if clicking the already active option
      option.current = false;
      const newSort = { ...sort };
      delete newSort._sort;
      delete newSort._order;
      setSort(newSort);
    } else {
      // Set new sort option
      if (sort._sort) {
        const prevSortOption = sortOptions.find(
          (v) => v.sort === sort._sort && v.order === sort._order,
        );
        if (prevSortOption) prevSortOption.current = false;
      }
      option.current = true;
      const newSort = { ...sort, _sort: option.sort, _order: option.order };
      setSort(newSort);
    }
  };

  const handlePage = (page) => {
    setPage(page);
  };

  return (
    <div className="bg-transparent">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilter
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          handleFilter={handleFilter}
          handleSort={handleSort}
          filters={filters}
        />

        <main className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-8 pt-12 gap-4">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
                Discover Products
              </h1>
              <p className="text-slate-500 text-lg">
                Browse our curated collection of premium goods
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Menu as="div" className="relative inline-block text-left z-30">
                <div>
                  <Menu.Button className="group flex items-center justify-center gap-2 rounded-2xl bg-white/40 backdrop-blur-md px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm border border-white/60 hover:bg-white/60 transition-all">
                    Sort By
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-indigo-500 group-hover:text-indigo-600 transition-transform duration-300 group-ui-open:rotate-180"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95 translate-y-2"
                  enterTo="transform opacity-100 scale-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="transform opacity-100 scale-100 translate-y-0"
                  leaveTo="transform opacity-0 scale-95 translate-y-2"
                >
                  <Menu.Items className="absolute right-0 z-[60] mt-3 w-56 origin-top-right rounded-[2rem] bg-white/80 backdrop-blur-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] ring-1 ring-black/5 focus:outline-none p-2 border border-white/60">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              className={classNames(
                                option.current
                                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                                  : "text-slate-600 hover:bg-white hover:shadow-sm",
                                "group flex w-full items-center px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200",
                              )}
                              onClick={() => handleSort(option)}
                            >
                              {option.name}
                              {option.current && (
                                <motion.svg
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="ml-auto w-4 h-4 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={3}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </motion.svg>
                              )}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              {/* <button
                type="button"
                className="hidden sm:flex items-center justify-center rounded-xl bg-white p-2.5 text-slate-400 shadow-sm ring-1 ring-inset ring-slate-300 hover:text-slate-500"
              >
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button> */}
              <button
                type="button"
                className="lg:hidden flex items-center justify-center rounded-xl bg-white p-2.5 text-slate-400 shadow-sm ring-1 ring-inset ring-slate-300 hover:text-slate-500"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="flex flex-col gap-10">
              <DesktopFilter
                handleFilter={handleFilter}
                filters={filters}
                activeFilters={filter}
              />

              {/* Product grid */}
              <div className="w-full">
                <ProductGrid products={products} />
              </div>
            </div>
          </section>
        </main>
        {/* Products grid Ends */}

        <div className="pb-12">
          <Pagination
            page={page}
            setPage={setPage}
            handlePage={handlePage}
            totalItems={totalItems}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}

const MobileFilter = ({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  handleSort,
  filters,
}) => {
  return (
    <div>
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters For mobile view*/}
                <form className="mt-4 border-t border-gray-200">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    onChange={(e) =>
                                      handleFilter(e, section, option)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500 cursor-pointer"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

const DesktopFilter = ({ handleFilter, filters, activeFilters }) => {
  // Count total active filters
  const totalActive = Object.values(activeFilters).reduce(
    (acc, curr) => acc + (curr ? curr.length : 0),
    0,
  );

  return (
    <div className="hidden lg:block relative z-20">
      <div className="flex flex-wrap items-center gap-4 bg-white/40 backdrop-blur-2xl border border-white/60 p-3 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3 px-4 py-2 bg-white/50 rounded-2xl shadow-sm border border-white/50">
          <div className="relative">
            <FunnelIcon className="w-5 h-5 text-indigo-600" />
            {totalActive > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
            )}
          </div>
          <span className="font-black text-slate-800 tracking-wide text-sm uppercase">
            Filter By
          </span>
        </div>

        {filters.map((section) => (
          <Menu as="div" key={section.id} className="relative">
            {({ open }) => (
              <>
                <Menu.Button
                  className={classNames(
                    "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 border-2",
                    activeFilters[section.id]?.length > 0 || open
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200"
                      : "bg-white/60 border-transparent text-slate-600 hover:bg-white hover:shadow-md",
                  )}
                >
                  <span>{section.name}</span>
                  {activeFilters[section.id]?.length > 0 && (
                    <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-xs">
                      {activeFilters[section.id].length}
                    </span>
                  )}
                  <ChevronDownIcon
                    className={classNames(
                      "h-4 w-4 transition-transform duration-300",
                      open ? "rotate-180" : "",
                    )}
                  />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-2"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-2"
                >
                  <Menu.Items className="absolute left-0 mt-3 w-72 origin-top-left bg-white/80 backdrop-blur-3xl border border-white/60 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] p-3 focus:outline-none overflow-hidden z-[100]">
                    <div className="max-h-80 overflow-y-auto no-scrollbar space-y-1 p-1">
                      {section.options.map((option) => {
                        const isChecked = activeFilters[section.id]?.includes(
                          option.value,
                        );
                        return (
                          <Menu.Item key={option.value}>
                            {({ active }) => (
                              <label
                                className={classNames(
                                  "flex items-center gap-3 w-full cursor-pointer px-4 py-3 rounded-2xl transition-all duration-200 group",
                                  active || isChecked
                                    ? "bg-white shadow-sm"
                                    : "hover:bg-white/50",
                                )}
                              >
                                <div
                                  className={classNames(
                                    "w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-300",
                                    isChecked
                                      ? "bg-indigo-600 border-indigo-600 shadow-inner"
                                      : "border-slate-300 bg-slate-50 group-hover:border-indigo-300",
                                  )}
                                >
                                  {isChecked && (
                                    <motion.svg
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="w-3.5 h-3.5 text-white"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={3}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </motion.svg>
                                  )}
                                </div>
                                <input
                                  type="checkbox"
                                  className="sr-only"
                                  checked={isChecked}
                                  onChange={(e) =>
                                    handleFilter(e, section, option)
                                  }
                                />
                                <span
                                  className={classNames(
                                    "text-sm font-semibold transition-colors duration-200",
                                    isChecked
                                      ? "text-indigo-900"
                                      : "text-slate-600 group-hover:text-slate-900",
                                  )}
                                >
                                  {option.label}
                                </span>
                              </label>
                            )}
                          </Menu.Item>
                        );
                      })}
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        ))}

        {/* Active Filters Display */}
        {totalActive > 0 && (
          <div className="flex-1 flex justify-end">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
                Active:
              </span>
              <AnimatePresence>
                {filters.map((section) =>
                  activeFilters[section.id]?.map((val) => {
                    const label = section.options.find(
                      (o) => o.value === val,
                    )?.label;
                    return (
                      <motion.span
                        key={`${section.id}-${val}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-semibold shadow-sm"
                      >
                        {label}
                        <button
                          type="button"
                          onClick={(e) =>
                            handleFilter(
                              { target: { checked: false } },
                              section,
                              { value: val },
                            )
                          }
                          className="hover:text-red-400 transition-colors"
                        >
                          <XMarkIcon className="w-3.5 h-3.5" />
                        </button>
                      </motion.span>
                    );
                  }),
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ProductGrid = ({ products }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((product) => {
        const pricediscounted = discountedPrice(
          product.price,
          product.discountPercentage,
        );
        const price = Math.round(product.price);

        return (
          <motion.div key={product.id} variants={item}>
            <Link
              to={`/product-detail/${product.id}`}
              className="group block relative bg-white rounded-3xl premium-shadow premium-shadow-hover overflow-hidden"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-slate-100 lg:h-72">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="glass px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-800 tracking-wider uppercase">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                    <StarIcon className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-amber-700">
                      {product.rating}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                  {product.description ||
                    "Premium quality product with exceptional features."}
                </p>
                <div className="flex items-end justify-between">
                  <div className="flex flex-col">
                    {pricediscounted !== price ? (
                      <>
                        <span className="text-xl font-extrabold text-slate-900">
                          ₹{pricediscounted}
                        </span>
                        <span className="text-xs font-medium line-through text-slate-400">
                          ₹{price}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-extrabold text-slate-900">
                        ₹{price}
                      </span>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
