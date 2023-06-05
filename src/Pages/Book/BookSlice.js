import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    book: [],
    selectedBooks: []
}

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setBook: (state, { payload }) => {
            if (!state.book.length && !payload.length) return;
            state.book = payload
        },
        setSelectedBooks: (state, action) => {
            state.selectedBooks = action.payload
        }
    }
})

const { reducer, actions } = bookSlice;
export const { setBook, setSelectedBooks } = actions
export default reducer;

