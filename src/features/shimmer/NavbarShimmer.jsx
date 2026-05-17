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
    </div>
  );
};

export default NavbarShimmer;
