import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  userTypeSample } from "../../Types/API-Types";

interface initialStateProps {
  user: userTypeSample | null;
  loading: boolean;
}
const initialState: initialStateProps = {
  user: null,
  loading: true,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userTypeSample>) => {
      state.user = action.payload;
      state.loading = false;
    },
    notSetUser: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setUser, notSetUser } = userSlice.actions;
