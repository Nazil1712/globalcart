import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const Protected = ({children}) =>{
    const loggedInUserToken = useSelector((state)=>state.auth.loggedInUserToken);
    console.log("Token",loggedInUserToken)

    if(!loggedInUserToken) {
        return <Navigate to={'/login'}></Navigate>
    }
    return children;
}

export default Protected;