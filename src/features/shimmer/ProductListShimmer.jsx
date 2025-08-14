import React from "react";

const ProductListShimmer = () => {
  const product = Array.from({ length: 10 });

  return (
    <div>
      {/* All Product Heading Shimmer */}
      <div className="bg-white h-[1000rem] relative">
        <div>
          <div className="bg-gray-200 animate-pulse w-56 h-10 relative top-24 left-8 rounded-lg"></div>
          <div className="bg-gray-200 animate-pulse w-11/12 h-[1px] relative top-28 left-8 rounded-lg"></div>
        </div>

        <div>
          <div className="bg-gray-200 animate-pulse relative top-20 w-14 h-4 left-[65rem] rounded"></div>
        </div>

        {/* Filters Shimmer */}
        <div>
          <div className="bg-gray-200 animate-pulse w-64 h-12 relative top-36 left-8 rounded-lg"></div>
          <div className="bg-gray-200 animate-pulse w-64 h-12 relative top-40 left-8 rounded-lg"></div>
        </div>

        {/* Product Grid Shimmer */}
        <div className="bg-gray-200 animate-pulse w-36 h-10 relative top-8 left-[22rem] rounded-lg"></div>

        <div className="relative left-[22rem] top-12 w-8/12 flex flex-wrap gap-x-8 gap-y-8">
          {product.map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 w-44 h-56 rounded-lg"></div>
              <div className="bg-gray-200 w-44 h-4 rounded-lg mt-2"></div>
              <div className="bg-gray-200 w-44 h-2 rounded-lg mt-2"></div>
              <div className="bg-gray-200 w-44 h-1 rounded-lg mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListShimmer;
