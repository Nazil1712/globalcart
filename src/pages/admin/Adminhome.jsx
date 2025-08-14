import { Link } from "react-router-dom";
import Adminproductlist from "../../features/admin/components/Adminproductlist";
import Navbar from "../../features/navbar/Navbar";

function Adminhome() {
    return ( 
        <>
        <Navbar>
            <Adminproductlist />
        </Navbar>
        </>
     );
}

export default Adminhome;