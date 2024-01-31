import { Navigate, Outlet } from "react-router-dom";
import rootState from "../Redux/RootState";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { user } = useSelector((state: rootState) => state.userSlice);

  let outlet = false;

  if (user?._id) {
    outlet = true;
} else {
    return <Navigate to="/login" />;
  }

  return <>{outlet && <Outlet />}</>;
};

export default ProtectedRoute;
