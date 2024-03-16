import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  usersData: [],
  error: false,
  loading: false,
};

export const allUsersData = createAsyncThunk(
  "usersData/allUsersData",
  async () => {
    try {
      const data = await axios.get(
        process.env.REACT_APP_API_BASE_PATH + "/api/users"
      );

      console.log("response from userdata slice", data, "alldata users");
    } catch (err) {
      console.log("error from slice", err);
    }
  }
);

const usersDataSlice = createSlice({
  name: "usersData",
  initialState,
  reducers: {
    addRegisterUser(state, action) {
      const user = action.payload;
      state.userDetails.userInfo = user;
    },
    updateUserProfile(state, action) {
      const user = action.payload;
      state.userDetails.userInfo = user;
      state.userDetails.success = true;
    },
    removeUser(state) {
      console.log(state.userDetails.userInfo, "  from slice ");
      state.userDetails.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allUsersData.pending, (state) => {
        state.userDetails.loading = true;
        state.userDetails.error = null;
      })
      .addCase(allUsersData.fulfilled, (state, action) => {
        state.userDetails.loading = false;
        state.userDetails.userInfo = action.payload;
      })
      .addCase(allUsersData.rejected, (state, action) => {
        state.userDetails.loading = false;
        state.userDetails.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
export const { addRegisterUser, updateUserProfile, removeUser } =
  usersDataSlice.actions;
