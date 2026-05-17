import React from "react";

export default function ProductdetailShimmer() {
  return (
    <div className="bg-slate-50/50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb Shimmer */}
        <div className="bg-slate-200 animate-pulse w-48 h-5 rounded-lg mb-8"></div>

        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
          {/* Image Gallery Shimmer */}
          <div className="flex flex-col gap-6">
            <div className="bg-slate-200 animate-pulse aspect-h-1 aspect-w-1 w-full rounded-[2.5rem] lg:h-[500px]"></div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-slate-200 animate-pulse h-24 rounded-2xl"></div>
              ))}
            </div>
          </div>

          {/* Product Info Shimmer */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 space-y-6">
            <div className="flex justify-between items-center">
              <div className="bg-slate-200 animate-pulse w-24 h-6 rounded-full"></div>
              <div className="bg-slate-200 animate-pulse w-20 h-6 rounded-xl"></div>
            </div>
            
            <div className="bg-slate-200 animate-pulse w-full h-12 rounded-xl"></div>
            <div className="bg-slate-200 animate-pulse w-3/4 h-12 rounded-xl"></div>

            <div className="flex items-baseline gap-4 pt-4">
              <div className="bg-slate-200 animate-pulse w-32 h-12 rounded-xl"></div>
              <div className="bg-slate-200 animate-pulse w-20 h-6 rounded-lg"></div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="bg-slate-200 animate-pulse w-full h-4 rounded-lg"></div>
              <div className="bg-slate-200 animate-pulse w-full h-4 rounded-lg"></div>
              <div className="bg-slate-200 animate-pulse w-2/3 h-4 rounded-lg"></div>
            </div>

            <div className="flex items-center gap-4 pt-6">
              <div className="bg-slate-200 animate-pulse flex-1 h-16 rounded-[1.5rem]"></div>
              <div className="bg-slate-200 animate-pulse w-16 h-16 rounded-[1.5rem]"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-slate-200 animate-pulse h-20 rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges Shimmer */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-slate-200 animate-pulse h-36 rounded-[2rem]"></div>
          ))}
        </div>

        {/* Related Products Shimmer */}
        <div className="mt-24">
          <div className="bg-slate-200 animate-pulse w-48 h-8 rounded-lg mb-8"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-[2rem] overflow-hidden flex flex-col h-full premium-shadow">
                <div className="bg-slate-200 animate-pulse aspect-h-1 aspect-w-1 w-full h-48"></div>
                <div className="p-6 space-y-3">
                  <div className="bg-slate-200 animate-pulse w-3/4 h-4 rounded-lg"></div>
                  <div className="flex justify-between items-center">
                    <div className="bg-slate-200 animate-pulse w-16 h-5 rounded-lg"></div>
                    <div className="bg-slate-200 animate-pulse w-10 h-4 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
