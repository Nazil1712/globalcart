import React from "react";

const ProductListShimmer = () => {
  const products = Array.from({ length: 8 });

  return (
    <div className="bg-slate-50/50 min-h-screen">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Shimmer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-8 gap-4">
          <div className="space-y-3">
            <div className="bg-slate-200 animate-pulse w-64 h-10 rounded-2xl"></div>
            <div className="bg-slate-200 animate-pulse w-48 h-5 rounded-lg"></div>
          </div>
          <div className="bg-slate-200 animate-pulse w-32 h-12 rounded-2xl"></div>
        </div>

        {/* Filters Shimmer */}
        <div className="mt-6 mb-10">
          <div className="bg-white/40 backdrop-blur-2xl border border-white/60 p-3 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-wrap gap-4 items-center">
            <div className="bg-slate-200 animate-pulse w-32 h-10 rounded-2xl"></div>
            <div className="bg-slate-200 animate-pulse w-28 h-10 rounded-2xl"></div>
            <div className="bg-slate-200 animate-pulse w-28 h-10 rounded-2xl"></div>
          </div>
        </div>

        {/* Product Grid Shimmer */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-4">
          {products.map((_, i) => (
            <div key={i} className="bg-white rounded-3xl premium-shadow overflow-hidden flex flex-col h-full">
              {/* Image Area */}
              <div className="bg-slate-200 animate-pulse aspect-h-1 aspect-w-1 w-full lg:h-72"></div>
              
              {/* Content Area */}
              <div className="p-6 flex-1 flex flex-col space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <div className="bg-slate-200 animate-pulse w-3/4 h-5 rounded-lg"></div>
                  <div className="bg-slate-200 animate-pulse w-10 h-5 rounded-lg"></div>
                </div>
                <div className="space-y-2 flex-1">
                  <div className="bg-slate-200 animate-pulse w-full h-3 rounded-lg"></div>
                  <div className="bg-slate-200 animate-pulse w-5/6 h-3 rounded-lg"></div>
                </div>
                <div className="flex items-end justify-between pt-2">
                  <div className="space-y-1">
                    <div className="bg-slate-200 animate-pulse w-16 h-6 rounded-lg"></div>
                    <div className="bg-slate-200 animate-pulse w-10 h-3 rounded-lg"></div>
                  </div>
                  <div className="bg-slate-200 animate-pulse w-24 h-9 rounded-xl"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductListShimmer;
