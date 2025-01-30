import useValidateUser from "../hooks/useValidateUser"
import { Navigate,Outlet } from "react-router-dom";

const AuthGaurd = ()=>{
    const signedIn = useValidateUser();

    if(signedIn == null) return <div>Loading...</div>

    return(
        signedIn ? <Outlet />:<Navigate to='/signin' />        
    )
}

export default AuthGaurd;