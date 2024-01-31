import { cartSlice } from "./Reducers/cartReducer";
import { userSlice } from "./Reducers/userReducer";

type rootState = {
  [userSlice.name]: ReturnType<typeof userSlice.reducer>;
  [cartSlice.name]: ReturnType<typeof cartSlice.reducer>;
};

//  Promise< typeOfData that promiseContains > === ReturnType<type of data that is being returned >
// ReturnType<typeof userApi.reducer>  : captures the type of what the userApi.reducer function returns.
// typeof userApi.reducer              : captures the type of the function userApi.reducer itself.

export default rootState;
