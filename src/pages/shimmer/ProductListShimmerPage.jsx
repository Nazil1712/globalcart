import React from 'react'
import Navbar from "../../features/navbar/Navbar";
import ProductListShimmer from '../../features/shimmer/ProductListShimmer';


const ProductListShimmerPage = () => {
  return (
    <div>
      <Navbar>
        <ProductListShimmer/>
      </Navbar>
    </div>
  )
}

export default ProductListShimmerPage
