import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userDetails: { userInfo: {}, loading: false, error: null },
};

export const loggedUserDetails = createAsyncThunk(
  "user/loggedUserDetails",
  async () => {
    const loggedUser = JSON.parse(localStorage.getItem("userInfo"));
    return loggedUser;
  }
);

const token = JSON.parse(localStorage.getItem("userInfo"));

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token.token}`,
  },
};

export const getUserDetails =  createAsyncThunk(
  "user/getUserDetails",
  
  async (id) => {
    console.log(id, " user details from slice")
    const  data  = await axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/users/${id}`, config);
    return data;

  }
)
// export const updateUserProfile = createAsyncThunk(
//   "user/updateUserProfile",
//   async () => {
//     const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_PATH}/api/users/profile`);
//   }
// )

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
    updateUserProfile(state,action) {
      const user = action.payload;
      state.userDetails.user = user;
    }
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
      .addCase(getUserDetails.pending, (state) => {
        state.userDetails.loading = true;
        state.userDetails.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.userDetails.loading = false;
        state.userDetails.userInfo = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.userDetails.loading = false;
        state.userDetails.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
export const { addRegisterUser, addLoginUser } = userSlice.actions;
