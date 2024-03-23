import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  usersData: [],
  error: false,
  loading: false,
};

const token = localStorage.getItem("token");
export const allUsersData = createAsyncThunk(
  "usersData/allUsersData",
  async () => {
    try {
      const data = await axios.get(
        process.env.REACT_APP_API_BASE_PATH + "/api/users",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response from userdata slice", data, "alldata users");
    } catch (err) {
      console.log("error from slice", err);
    }
  }
);

const allusersDataSlice = createSlice({
  name: "usersData",
  initialState,
  reducers: {
    addUsers(state, action) {
     state.usersData = state.usersData .push(action.payload)
    },
    updateUser(state, action) {
       state.usersData=state.usersData.map((ele,ind)=>{
        return ele=action.payload
       })
    },
    deActiveUser(state,action) {
      state.usersData = state.usersData.map((ele,ind)=>{
        return ele._isActive=action.payload
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allUsersData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(allUsersData.fulfilled, (state, action) => {
        state.loading = false;
        state.usersData = action.payload;
      })
      .addCase(allUsersData.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.usersData=[]
      });
  },
});

export default allusersDataSlice.reducer;
export const { addUsers, updateUser, deActiveUser } = allusersDataSlice.actions;
  
