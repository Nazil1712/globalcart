import Navbar from "../features/navbar/Navbar";
import Productlist from "../features/product/components/Productlist";

function Home() {
    return ( 
        <>
        <Navbar>
            <Productlist></Productlist>
        </Navbar>
        </>
     );
}

export default Home;