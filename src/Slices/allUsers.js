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
     state.usersData = state.usersData .push(action.payload)
    },
    updateUserProfile(state, action) {
      
    },
    removeUser(state,action) {
      state.usersData = state.usersData.filter((ele,ind)=>{
        return ele._id!=action.payload
      })
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
