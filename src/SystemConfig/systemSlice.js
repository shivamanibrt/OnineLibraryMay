import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    modalShow: false
}

const bookSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        setShowModal: (state, action) => {
            state.modalShow = action.payload
        }
    }
})

const { reducer, actions } = bookSlice;
export const { setShowModal } = actions
export default reducer;

