import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ITEMS_PER_PAGE } from "../../app/constants";
import { motion } from "framer-motion";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Pagination = ({ page, setPage, handlePage, totalItems, totalPages }) => {
  return (
    <div className="flex items-center justify-between px-4 py-8 sm:px-6">
      {/* Mobile Pagination */}
      <div className="flex flex-1 justify-between sm:hidden gap-4">
        <button
          onClick={() => {
            if (page > 1) handlePage(page - 1);
          }}
          disabled={page === 1}
          className="relative inline-flex flex-1 items-center justify-center rounded-2xl bg-white/80 backdrop-blur-md px-4 py-3 text-sm font-bold text-slate-700 shadow-sm border border-white/60 hover:bg-white hover:text-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (page < totalPages) handlePage(page + 1);
          }}
          disabled={page === totalPages}
          className="relative inline-flex flex-1 items-center justify-center rounded-2xl bg-white/80 backdrop-blur-md px-4 py-3 text-sm font-bold text-slate-700 shadow-sm border border-white/60 hover:bg-white hover:text-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Desktop Pagination */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-base font-medium text-slate-500 bg-white/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/60 shadow-sm">
            Showing{" "}
            <span className="font-bold text-slate-800">
              {(page - 1) * ITEMS_PER_PAGE + 1 >= 1
                ? (page - 1) * ITEMS_PER_PAGE + 1
                : 0}
            </span>{" "}
            to{" "}
            <span className="font-bold text-slate-800">
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-bold text-slate-800">{totalItems}</span>{" "}
            results
          </p>
        </div>

        <div>
          <nav
            className="isolate inline-flex items-center gap-2"
            aria-label="Pagination"
          >
            <button
              onClick={() => {
                if (page > 1) handlePage(page - 1);
              }}
              disabled={page === 1}
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/60 backdrop-blur-md text-slate-500 border border-white/60 shadow-sm hover:bg-white hover:text-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon
                className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform"
                aria-hidden="true"
              />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNumber = i + 1;
              const isActive = page === pageNumber;

              // Simple logic to show limited pages if there are many
              // Show first, last, current, and adjacent to current
              if (
                totalPages > 7 &&
                pageNumber !== 1 &&
                pageNumber !== totalPages &&
                Math.abs(page - pageNumber) > 1
              ) {
                if (pageNumber === 2 || pageNumber === totalPages - 1) {
                  return (
                    <span key={i} className="px-2 text-slate-400">
                      ...
                    </span>
                  );
                }
                return null;
              }

              return (
                <button
                  key={i}
                  onClick={() => handlePage(pageNumber)}
                  aria-current={isActive ? "page" : undefined}
                  className={classNames(
                    "relative inline-flex items-center justify-center w-10 h-10 text-sm font-bold rounded-xl transition-all duration-200",
                    isActive
                      ? "z-10 bg-indigo-600 text-white shadow-[0_8px_20px_-5px_rgba(79,70,229,0.5)] border-indigo-600 scale-110"
                      : "bg-white/60 backdrop-blur-md text-slate-600 border border-white/60 shadow-sm hover:bg-white hover:text-indigo-600 hover:scale-105",
                  )}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => {
                if (page < totalPages) handlePage(page + 1);
              }}
              disabled={page === totalPages}
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/60 backdrop-blur-md text-slate-500 border border-white/60 shadow-sm hover:bg-white hover:text-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon
                className="h-5 w-5 group-hover:translate-x-0.5 transition-transform"
                aria-hidden="true"
              />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
