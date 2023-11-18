import { createSlice } from "@reduxjs/toolkit";
import getUser from "../login/GetUser";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(sessionStorage.getItem("user")),
    status: null,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(state.user));
    },
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
      console.log("loading", state.status);
      console.log("user", state.user);
    },
    [getUser.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.user = action.payload;
      console.log("user", state.user);
      sessionStorage.setItem("user", JSON.stringify(state.user));
      console.log("resolved", state.status);
    },
    [getUser.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      console.log("rejected", state.status);
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
