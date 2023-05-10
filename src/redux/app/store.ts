import { configureStore } from "@reduxjs/toolkit";

import loginReducer from '../features/auth/loginSlice';
import userReducer from  '../features/user/userSlice'


const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch