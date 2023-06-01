import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    book: []
}

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setBook: (state, { payload }) => {
            if (!state.book.length && !payload.length) return;
            state.book = payload
        }
    }
})

const { reducer, actions } = bookSlice;
export const { setBook } = actions
export default reducer;

