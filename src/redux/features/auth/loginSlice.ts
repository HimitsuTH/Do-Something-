import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { fetchUser } from "../user/userSlice";

interface Login {
  email: string;
  password: string;
}

interface Validation {
  msg: string;
}

interface InitialState {
  loading: boolean;
  error: {
    message?: string;
    status_code?: string;
    validation?: Validation[];
  };
}

const initialState: InitialState = {
  loading: false,
  error: {
    message: "",
    status_code: "",
    validation: [],
  },
};

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async ({ email, password }: Login, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/user/login`,
        {
          email,
          password,
        }
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      // state.user = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload));
      fetchUser();
      state.error.message = "";
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;

      if (action.payload) {
        let errorMessage = action.payload;
        state.error = errorMessage;
      } else {
        state.error.message = action.error.message || "Something went wrong!!";
      }
      // console.log(state.error);
    });
  },
});

export default loginSlice.reducer;
