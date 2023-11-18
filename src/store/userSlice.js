import { createSlice } from "@reduxjs/toolkit";
import getUser from "../components/login/GetUser";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(sessionStorage.getItem("user")),
    // user: null,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "resolved";
        state.user = action.payload;
        sessionStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
