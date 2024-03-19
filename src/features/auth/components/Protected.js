import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const Protected = ({children}) =>{
    const loggedInUser = useSelector((state)=>state.auth.loggedInUser);

    if(!loggedInUser) {
        return <Navigate to={'/login'}></Navigate>
    }
    return children;
}

export default Protected;