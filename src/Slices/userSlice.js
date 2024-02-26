import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userDetails: { userInfo: {}, loading: false, success: false, error: null },
};

export const loggedUserDetails = createAsyncThunk(
  "user/loggedUserDetails",
  async () => {
    const loggedUser = JSON.parse(localStorage.getItem("userInfo"));
    return loggedUser;
  }
);

const getAuthToken = () => {
  const token = JSON.parse(localStorage.getItem("userInfo"));
  console.log(token, "  token from slice ");
  return token ? token.token : null;
};

//const token = JSON.parse(localStorage.getItem("userInfo"));

const config = () => {
  const token = getAuthToken();
  console.log(token, " token from slice ");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",

  async (id) => {
    console.log(id, " user details from slice");
    const data = await axios.get(
      `${process.env.REACT_APP_API_BASE_PATH}/api/users/profile/${id}`,
      config()
    );
    return data;
  }
);

export const updateUserDetails = createAsyncThunk(
  "user/updateUserProfile",
  async (id, payload) => {
    console.log("id::::::::::::", id, payload);
    const { data } = await axios.put(
      `${process.env.REACT_APP_API_BASE_PATH}/api/users/profile/${id}`,
      payload,
      config()
    );
    console.log(data, " from slice in application ");
    if (data) {
      const token = getAuthToken();
      const obj = { ...data, token: token };
      console.log(token, "  token form slice ---------------");
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
  }
);


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addRegisterUser(state, action) {
      const user = action.payload;
      state.userDetails.success = true;
      state.userDetails.userInfo = user;
    },
    addLoginUser(state, action) {
      const person = action.payload;
      state.userDetails.success = true;
      state.userDetails.userInfo = person;
    },
    updateUserProfile(state, action) {
      const user = action.payload;
      state.userDetails.userInfo = user;
      state.userDetails.success = true;
    },
    removeUser(state) {
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
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.userDetails.loading = true;
        state.userDetails.error = null;
        state.userDetails.success = true;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.userDetails.loading = false;
        state.userDetails.error = null;
        state.userDetails.success = true;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.userDetails.loading = false;
        state.userDetails.error = action.error.message;
        state.userDetails.success = false;
      })
      // .addCase(logout.pending, (state) => {
      //   state.userDetails.loading = true;
      //   state.userDetails.error = null;
      // })
      // .addCase(logout.fulfilled, (state) => {
      //   state.userDetails.loading = false;
      //   state.userDetails.userInfo = {};
      // })
      // .addCase(logout.rejected, (state, action) => {
      //   state.userDetails.loading = false;
      //   state.userDetails.error = action.error.message;
      // });
  },
});

export default userSlice.reducer;
export const { addRegisterUser, addLoginUser, updateUserProfile, removeUser } = userSlice.actions;
