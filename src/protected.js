import { Navigate, Outlet } from "react-router-dom";
import React, { useContext }  from 'react';
import { AuthContext } from "./Auth";
import { useNavigate } from "react-router-dom";

const Protected = () => {
    let auth = useContext(AuthContext)
    let navigate = useNavigate()


    return (
        auth.isLoggedinAdmin ? <Outlet/> : <Navigate to='/login'/>
      )


};
export default Protected;