import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const Protectedadmin = ({children}) =>{
    const loggedInUser = useSelector((state)=>state.auth.loggedInUser);

    if(!loggedInUser) {
        return <Navigate to={'/login'}></Navigate>
    }
    if(loggedInUser && loggedInUser.role!=='admin') {
        return <Navigate to={'/'}></Navigate>
    }
    return children;
}

export default Protectedadmin;