import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Pages/Redux/User/userSlice";

export default configureStore({
    reducer: {
        user: userReducer
    },
})