import React from "react";

const NavbarShimmer = () => {
  return (
    <div className="bg-slate-50/50 min-h-screen">
      {/* Navbar Shimmer */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/60 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-8">
              {/* Logo */}
              <div className="bg-slate-200 animate-pulse h-10 w-32 rounded-xl"></div>
              {/* Nav Links */}
              <div className="hidden md:flex space-x-4">
                <div className="bg-slate-200 animate-pulse h-5 w-16 rounded-lg"></div>
                <div className="bg-slate-200 animate-pulse h-5 w-16 rounded-lg"></div>
                <div className="bg-slate-200 animate-pulse h-5 w-16 rounded-lg"></div>
              </div>
            </div>
            {/* Right side */}
            <div className="flex items-center gap-4">
              <div className="bg-slate-200 animate-pulse h-10 w-10 rounded-full"></div>
              <div className="bg-slate-200 animate-pulse h-10 w-10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Shimmer (Generic) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {/* Page Title */}
          <div className="bg-slate-200 animate-pulse w-64 h-10 rounded-2xl"></div>
          
          {/* Generic Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-4 pt-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl premium-shadow overflow-hidden flex flex-col h-full">
                <div className="bg-slate-200 animate-pulse aspect-h-1 aspect-w-1 w-full h-48"></div>
                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="bg-slate-200 animate-pulse w-3/4 h-5 rounded-lg"></div>
                  <div className="bg-slate-200 animate-pulse w-full h-3 rounded-lg flex-1"></div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="bg-slate-200 animate-pulse w-16 h-6 rounded-lg"></div>
                    <div className="bg-slate-200 animate-pulse w-20 h-8 rounded-xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarShimmer;
