import { Link } from "react-router-dom";
import Adminproductlist from "../../features/admin/components/Adminproductlist";
import Navbar from "../../features/navbar/Navbar";

function Adminhome() {
    return ( 
        <>
        <Link to='/product-list-shimmer'>Go to shimmer</Link>
        <Navbar>
            <Adminproductlist />
        </Navbar>
        </>
     );
}

export default Adminhome;