import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userDetails: { userInfo: {}, loading: false, success: false, error: null },
};

export const loggedUserDetails = createAsyncThunk(
  "user/loggedUserDetails",
  async () => {
    const data = await axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/products`)
    const loggedUser = JSON.parse(localStorage.getItem("userInfo"));
    return loggedUser;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addRegisterUser(state, action) {
      const user = action.payload;
      state.userDetails.userInfo = user;
    },
    addLoginUser(state, action) {
      const person = action.payload;
      state.userDetails.userInfo = person;
    },
    updateUserProfile(state, action) {
      const user = action.payload;
      state.userDetails.userInfo = user;
      state.userDetails.success = true;
    },
    removeUser(state) {
      console.log(state.userDetails.userInfo,"  from slice ")
      state.userDetails.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loggedUserDetails.pending, (state) => {
        state.userDetails.loading = true;
        state.userDetails.error = null;
      })
      .addCase(loggedUserDetails.fulfilled, (state, action) => {
        state.userDetails.loading = false;
        state.userDetails.userInfo = action.payload;
      })
      .addCase(loggedUserDetails.rejected, (state, action) => {
        state.userDetails.loading = false;
        state.userDetails.error = action.error.message;
      })
  },
});

export default userSlice.reducer;
export const { addRegisterUser, addLoginUser, updateUserProfile, removeUser } = userSlice.actions;
