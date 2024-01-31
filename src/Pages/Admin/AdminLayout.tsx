import { Navigate, Outlet } from "react-router-dom";
import AdminSideBar from "../../Components/Admin/AdminSideBar";
import { useSelector } from "react-redux";
import rootState from "../../Redux/RootState";
// import "../../Styles/App.scss";

const AdminLayout = () => {
  const { user } = useSelector((state: rootState) => state.userSlice);
  return (
    <>
      <div className="adminContainer">
        {user?.role === "admin" ? (
          <>
            <AdminSideBar />
            <Outlet />
          </>
        ) : (
          <Navigate to="/" />
        )}
      </div>
    </>
  );
};

export default AdminLayout;
