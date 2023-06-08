import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {},
    userCount: [],
    allUser: []

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
        setAllUser: (state, action) => {
            state.allUser = action.payload
        },
    }
})
const { reducer, actions } = userSlice;
export const { setUser, setUserCount, setAllUser } = actions;
export default reducer;