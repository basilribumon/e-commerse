import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }){
    const { isAuthenticated } = useSelector((state)=>state.auth)
    console.log("Auth:",isAuthenticated)
    
    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }
    return children
}
export default ProtectedRoute;