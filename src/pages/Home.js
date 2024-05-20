import { useSelector } from "react-redux";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import Productlist from "../features/product/components/Productlist";
import ProductListShimmerPage from "./shimmer/ProductListShimmerPage";

function Home() {
  const listStatus = useSelector((state) => state.product.status);
  console.log(listStatus);


  return (
    <>
      {listStatus === "loading" ? (
        <>
          <ProductListShimmerPage />
        </>
      ) : null}
      <Navbar>
        <Productlist></Productlist>
      </Navbar>
      <Footer />
    </>
  );
}

export default Home;
