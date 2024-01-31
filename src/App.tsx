import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Global Pages
const Home = lazy(() => import("./Pages/Home"));
const Cart = lazy(() => import("./Pages/Cart"));
const Search = lazy(() => import("./Pages/Search"));
const Order = lazy(() => import("./Pages/Order"));
const Shipping = lazy(() => import("./Pages/Shipping"));
const Login = lazy(() => import("./Pages/Login"));
const OrderDetails = lazy(() => import("./Pages/OrderDetails"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const Checkout = lazy(() => import("./Pages/Checkout"));

//  Components
import Navbar from "./Components/Navbar";
import Loader from "./Components/Loader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { notSetUser, setUser } from "./Redux/Reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "./Redux/API/UserApi";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/ProtectedRoute";
import rootState from "./Redux/RootState";
// Admin Pages
const Dashboard = lazy(() => import("./Pages/Admin/Dashboard"));
const Products = lazy(() => import("./Pages/Admin/Products"));
const Customers = lazy(() => import("./Pages/Admin/Customers"));
const Transactions = lazy(() => import("./Pages/Admin/Transactions"));
const TransactionManagement = lazy(
  () => import("./Pages/Admin/Management/TransactionManagement")
);
const Pie = lazy(() => import("./Pages/Admin/Charts/Pie"));
const Bar = lazy(() => import("./Pages/Admin/Charts/Bar"));
const Line = lazy(() => import("./Pages/Admin/Charts/Line"));
const ProductManagement = lazy(
  () => import("./Pages/Admin/Management/ProductManagement")
);
const NewProduct = lazy(() => import("./Pages/Admin/Management/NewProduct"));
const AdminLayout = lazy(() => import("./Pages/Admin/AdminLayout"));

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: rootState) => state.userSlice);


  // return signOut(auth).then((c) => console.log('done'))

  // After the user Logs-in , this onAuthStateChanged will get triggered.
  // It will set the user's data in the global state using RTK.
  // If a user Logs-out this again will get triggered , the condition will check if the user exists , if not
  // the global user state will be set to null , which will endup re-rendering all the componenets using the user-global-state.
  useEffect(() => {
    // This function gets trigged when a user logs in or logs out from the firebase
    // If I have logged In , this onAuthStateChange will always have the user inside it ,
    // and we can get it to popule the global user state, this will run and populate the global state every time the page refreshes
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getSingleUser(user.uid);
        
        dispatch(setUser(data.userData));
      } else {
        dispatch(notSetUser());
      }
    });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <main>
            <Navbar />

            <Routes>
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/search" element={<Search />} />
                <Route path="/order" element={<Order />} />
                <Route path="/order/:id" element={<OrderDetails />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/pay" element={<Checkout />} />
              </Route>

              {/* This route can't be accessed by the logged in User */}
              {/* This Route is protected from the logged-In user In the Login Component itself */}
              <Route path="/login" element={<Login />} />

              {/* Admin Routes */}
              {/* Admin Layout Ensures that the admin Routes are only Accessed by the Admin */}
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/product" element={<Products />} />
                <Route path="/admin/product/new" element={<NewProduct />} />
                <Route
                  path="/admin/product/:id"
                  element={<ProductManagement />}
                />
                <Route path="/admin/customer" element={<Customers />} />
                <Route path="/admin/transaction" element={<Transactions />} />
                <Route
                  path="/admin/transaction/:id"
                  element={<TransactionManagement />}
                />

                {/* Admin Charts Route */}
                <Route path="/admin/pie" element={<Pie />} />
                <Route path="/admin/bar" element={<Bar />} />
                <Route path="/admin/line" element={<Line />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Toaster />
        </Suspense>
      )}
    </>
  );
}

export default App;
