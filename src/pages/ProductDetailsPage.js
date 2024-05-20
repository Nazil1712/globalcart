import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import Productdetails from "../features/product/components/Productdetails";

const Productdetailspage = () => {
  return (
    <>
      <Navbar>
        <Productdetails />
      </Navbar>
      <Footer/>
    </>
  );
};

export default Productdetailspage;
