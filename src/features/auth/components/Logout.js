import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutAsync } from "../authslice";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.auth.loggedInUser)

  useEffect(()=>{
    dispatch(signOutAsync())
  })
  
  return (
    <>
    {user==null && <Navigate to='/login' replace={true}></Navigate>}
    </>
  );
};

export default Logout;
