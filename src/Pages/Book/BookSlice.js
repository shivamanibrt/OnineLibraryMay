import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    book: [],
    selectedBooks: [],
    burrowBooksHistory: []
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
        },
        setBurrowBooksHistory: (state, action) => {
            state.burrowBooksHistory = action.payload
        }
    }
})

const { reducer, actions } = bookSlice;
export const { setBook, setSelectedBooks, setBurrowBooksHistory } = actions
export default reducer;

