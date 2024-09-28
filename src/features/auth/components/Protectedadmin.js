import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const Protectedadmin = ({children}) =>{
    const userInfo = useSelector((state)=>state.user.userInfo);

    if(!userInfo) {
        return <Navigate to={'/login'}></Navigate>
    }
    if(userInfo && userInfo.role!=='admin') {
        return <Navigate to={'/'}></Navigate>
    }
    return children;
}

export default Protectedadmin;