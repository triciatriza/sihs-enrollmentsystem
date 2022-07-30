import { Outlet } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

const useAuth= () => {
    const user = {loggedIn: false};
    return user && user.loggedIn;
}


const ProtectedRoutes = () =>{
    const isAuth = useAuth();

    return isAuth ?  <Outlet/> : <NotFoundPage/>
}

export default ProtectedRoutes;