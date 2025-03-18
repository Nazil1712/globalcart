import React from "react";

const NavbarShimmer = () => {
  const product = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      {/* All Product Heading Shimmer */}
      <div className="bg-white h-[1000rem] relative ">

        {/* Navbar */}
        <div>
          <div className="bg-shimmer w-full h-16 relative rounded-lg   "></div>
          {/* <div className="bg-shimmer w-36 h-12 relative top-36 left-8 rounded-lg  "></div> */}
        </div>

        {/*  */}
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div>
            <div className="bg-shimmer w-56 h-10 relative top-24 left-8 rounded-lg   "></div>
            <div className="bg-shimmer w-11/12 h-[1px] relative top-28 left-8 rounded-lg   "></div>
          </div>

          <div>
            <div className="bg-shimmer relative top-20 w-14 h-4 left-[65rem]"></div>
          </div>

          {/* Filters Shimmer */}
          <div>
            <div className="bg-shimmer w-64 h-12 relative top-36 left-8 rounded-lg  "></div>
            <div className="bg-shimmer w-64 h-12 relative top-40 left-8 rounded-lg  "></div>
          </div>

          {/* Product Grid Shimmer */}
          <div className="bg-shimmer w-36 h-10 relative top-8 left-[22rem] rounded-lg  "></div>

          <div className="relative left-[22rem] top-12 w-8/12 flex flex-wrap gap-x-8 gap-y-8  ">
            {product.map((v, i, arr) => (
              <div key={v}>
                <div className="bg-shimmer w-44 h-56 rounded-lg  "></div>
                <div className="bg-shimmer w-44 h-4 rounded-lg mt-2  "></div>
                <div className="bg-shimmer w-44 h-2 rounded-lg mt-2  "></div>
                <div className="bg-shimmer w-44 h-1 rounded-lg mt-2  "></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarShimmer;
