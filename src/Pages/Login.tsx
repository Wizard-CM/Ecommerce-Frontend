import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { useCreateNewUserMutation } from "../Redux/API/UserApi";
import { useDispatch, useSelector } from "react-redux";
import rootState from "../Redux/RootState";
import { Navigate } from "react-router-dom";
import ToasterFunction from "../Components/Toaster";
import { notSetUser, setUser } from "../Redux/Reducers/userReducer";
import { userTypeSample } from "../Types/API-Types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { fetchResponseError } from "../Types/General";
import toast from "react-hot-toast";

const Login = () => {
  const [gender, setGender] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [login] = useCreateNewUserMutation();
  const dispatch = useDispatch();
  const {user:UserData} = useSelector((state:rootState) => state.userSlice)

  //   Handlers
  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const res = await login({
        username: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        dob,
        gender,
        uid: user.uid,
      });

      if ("data" in res) {
        const userSetData: userTypeSample = {
          username: res.data.userData.username,
          email: res.data.userData.email,
          photo: res.data.userData.photo,
          gender: res.data.userData.gender,
          uid: res.data.userData.uid,
          _id: res.data.userData._id,
          role: res.data.userData.role,
        };
        dispatch(setUser(userSetData));

        console.log(UserData)
        ToasterFunction(res,`Welcome Back  ${user.displayName!} `)
      //  return  navigate("/")
      } else {
        const err = res.error as FetchBaseQueryError;
        const message = (err.data as fetchResponseError).message;
        toast.error(message)
        dispatch(notSetUser());
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Redirect Code If needed
  if (UserData?._id) {
    return <Navigate to="/" />;
  }

  return (
    <div className="global-container">
      <div className="login-page">
        <div className="login-form">
          <h2>LOGIN</h2>
          <form>
            <label>
              <span>Gender</span>
              <select
                name=""
                id=""
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value="none">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label>
              <span>Date Of Birth</span>
              <input
                type="date"
                onChange={(e) => {
                  setDob(e.target.value);
                }}
              />
            </label>
          </form>

          <p>Already Signed In Once</p>
          <div className="login-button">
            <button onClick={loginHandler}>
              <FcGoogle /> <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
