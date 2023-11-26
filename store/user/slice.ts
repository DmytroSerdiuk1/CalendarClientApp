import { createSlice } from "@reduxjs/toolkit";
import { checkUserExist, login, register } from "@/store/user/thunks";
import Router from "next/router";

const initialState = {
  user: null,
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.user = initialState.user;
      Router.push("/login");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      Router.push("/");
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    });

    builder.addCase(checkUserExist.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  },
});

export const { logout } = usersSlice.actions;
export default usersSlice.reducer;
