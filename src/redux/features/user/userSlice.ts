import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../services/auth.header";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface InitialState {
  loading: boolean;
  userData: User | undefined;
  error: string;
}

const initialState: InitialState = {
  loading: false,
  userData: undefined,
  error: "",
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  return await axios
    .get(`${import.meta.env.VITE_URL}/user/me`, { headers: authHeader() })
    .then((res) => res.data);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      localStorage.removeItem("userData");
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      const userData: User | undefined = action.payload.user;
      state.loading = false;
      state.userData = userData;
      localStorage.setItem("userData", JSON.stringify(userData));
      state.error = "";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.userData = undefined;
      state.error = action.error.message || "Something went wrong!!";
    });
  },
});

export default userSlice.reducer;
