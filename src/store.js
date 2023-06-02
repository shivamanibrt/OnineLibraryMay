import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Pages/Redux/User/userSlice";
import bookReducer from './Pages/Book/BookSlice'
import systemReducer from './SystemConfig/systemSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        book: bookReducer,
        system: systemReducer
    },
})