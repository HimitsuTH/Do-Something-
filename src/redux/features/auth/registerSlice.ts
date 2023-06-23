import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface userRegister {
  email: string;
  password: string;
  conPassword?: string;
  name: string;
}

interface Validation {
  msg: string;
}

interface InitialState {
  loading: boolean;
  registedMsg: string;
  error: {
    message?: string;
    status_code?: string;
    validation?: Validation[];
  };
}

const initialState: InitialState = {
  loading: false,
  registedMsg: "",
  error: {
    message: "",
    status_code: "",
    validation: [],
  },
};

export const userRegister = createAsyncThunk(
  "user/register",
  async ({ name, email, password }: userRegister, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/user/`, {
        name,
        email,
        password,
      });

      
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.loading = false;
      state.registedMsg = action.payload;
      state.error.message = "";
    });
    builder.addCase(userRegister.rejected, (state, action) => {
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

export default registerSlice.reducer;
