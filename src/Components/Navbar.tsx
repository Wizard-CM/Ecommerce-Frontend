import  {  useState } from "react";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import rootState from "../Redux/RootState";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

const Navbar = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useSelector((state: rootState) => state.userSlice);
  // Handler
  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        toast.success("Signed Out Successfully");
      })
      .catch((error) => {
        
        console.log(error)
        toast.success("Failed Signing Out");
      });
  };

  return (
    <div className="navbar">
      <div className="nav-items">
        <Link to="/">HOME</Link>
        <Link to={"/search"}>
          <FaSearch />
        </Link>
        <Link to={"/cart"}>
          <FaShoppingBag />
        </Link>

        {user?._id ? (
          <span
            onClick={() => {
              setDialogOpen(!dialogOpen);
            }}
          >
            <FaUser />
          </span>
        ) : (
          <span>
            <Link to="/login">
              <FaSignInAlt />
            </Link>
          </span>
        )}
        <div className="dialog-wrapper">
          <dialog
            open={dialogOpen}
            style={
              dialogOpen ? { visibility: "visible" } : { visibility: "hidden" }
            }
          >
            {user?.role === "admin" && (
              <Link
                to="/admin/dashboard"
                onClick={() => {
                  setDialogOpen(false);
                }}
              >
                Admin
              </Link>
            )}
            <Link
              to="/order"
              onClick={() => {
                setDialogOpen(false);
              }}
            >
              Orders
            </Link>
            <button
              onClick={() => {
                logoutHandler()
                setDialogOpen(false);

              }}
            >
              Signout
            </button>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
