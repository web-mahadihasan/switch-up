import { useContext } from "react";
import { AuthProviderContext } from "../provider/AuthProvider";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";

const PrivateRoute = ({children}) => {
    const {currentUser, loading} = useContext(AuthProviderContext);

    if(loading){
        return (
            <Loader/>
        )
    }
    if(currentUser){
        return children;
    }
    return (
        <Navigate to={"/login-page"}></Navigate>
    )
};

export default PrivateRoute;