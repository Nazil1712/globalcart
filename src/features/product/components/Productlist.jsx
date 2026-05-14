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
  { name: "Reset", sort: "reset", order: "reset", current: false },
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
    option.current = true;
    // console.log("Sort",sort)
    if (sort._sort) {
      console.log("I am in");
      const prevSortOption = sortOptions.find(
        (v, i, arr) => v.sort == sort._sort,
      );
      console.log(prevSortOption);
      prevSortOption.current = false;
      console.log(prevSortOption);
    }
    const newSort = { ...sort, _sort: option.sort, _order: option.order };
    // console.log("New Sort",newSort)
    setSort(newSort);
    // console.log(option.sort, option.order);
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
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-all">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5 flex-shrink-0 text-slate-400 group-hover:text-slate-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-2xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none p-1">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              className={classNames(
                                option.current
                                  ? "bg-indigo-50 text-indigo-600 font-bold"
                                  : "text-slate-600",
                                active ? "bg-slate-50" : "",
                                "block w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors",
                              )}
                              onClick={() => handleSort(option)}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="hidden sm:flex items-center justify-center rounded-xl bg-white p-2.5 text-slate-400 shadow-sm ring-1 ring-inset ring-slate-300 hover:text-slate-500"
              >
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
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
  return (
    <div className="hidden lg:block space-y-10">
      {filters.map((section) => (
        <div key={section.id} className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-1.5 h-5 bg-indigo-600 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
              {section.name}
            </h3>
          </div>

          <div className="relative group/scroll">
            {/* Edge Fades for better scroll indicators */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-50/50 to-transparent z-10 pointer-events-none opacity-0 group-hover/scroll:opacity-100 transition-opacity" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-50/50 to-transparent z-10 pointer-events-none opacity-0 group-hover/scroll:opacity-100 transition-opacity" />

            <div className="flex flex-nowrap overflow-x-auto gap-3 no-scrollbar pb-4 px-2 scroll-smooth">
              {section.options.map((option, optionIdx) => {
                const isChecked = activeFilters[section.id]?.includes(
                  option.value,
                );
                return (
                  <label
                    key={option.value}
                    className={classNames(
                      "group relative flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold cursor-pointer transition-all duration-300 border-2 whitespace-nowrap min-w-max",
                      isChecked
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-[0_10px_20px_-5px_rgba(79,70,229,0.3)]"
                        : "bg-white border-slate-100 text-slate-500 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md",
                    )}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isChecked}
                      onChange={(e) => handleFilter(e, section, option)}
                    />
                    <span className="relative z-10">{option.label}</span>
                    {isChecked && (
                      <motion.span
                        layoutId={`active-pill-${section.id}`}
                        className="absolute inset-0 rounded-full bg-indigo-600 -z-10"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      ))}
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
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
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
