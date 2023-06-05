import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {},
    userCount: 0,
    userData: [],
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setUserCount: (state, action) => {
            state.userCount = action.payload
        },
        setUserData: (state, action) => {
            state.userCount = action.payload
        },
    }
})
const { reducer, actions } = userSlice;
export const { setUser, setUserCount, setUserData } = actions;
export default reducer;