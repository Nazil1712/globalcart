import { useSelector } from "react-redux";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import Productdetails from "../features/product/components/ProductDetails";

const Productdetailspage = () => {
  const productFetched = useSelector((state) => state.product.status);

  return (
    <>
      <Navbar>
        <Productdetails />
      </Navbar>
      {productFetched === "idle" && <Footer />}
    </>
  );
};

export default Productdetailspage;
