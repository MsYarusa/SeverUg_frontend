import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../requests/UserRequest";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(sessionStorage.getItem("user")),
    status: null,
    error: null,
  },
  reducers: {
    removeUser(state, action) {
      state.user = null;
    },
  },
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

export const { removeUser } = userSlice.actions;
export default userSlice.reducer;
