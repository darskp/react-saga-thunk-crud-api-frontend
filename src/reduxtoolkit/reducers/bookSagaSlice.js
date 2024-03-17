import { createSlice } from "@reduxjs/toolkit";
import { DELETE_BOOK_DATA_FULFILLED, DELETE_BOOK_DATA_PENDING, DELETE_BOOK_DATA_REJECTED, FETCH_BOOKS_DATA_FULFILLED, FETCH_BOOKS_DATA_PENDING, FETCH_BOOKS_DATA_REJECTED, GET_BOOK_DATA_BY_ID_FULFILLED, GET_BOOK_DATA_BY_ID_PENDING, GET_BOOK_DATA_BY_ID_REJECTED, POST_ADD_BOOK_DATA_FULFILLED, POST_ADD_BOOK_DATA_PENDING, POST_ADD_BOOK_DATA_REJECTED, PUT_UPDATE_BOOK_DATA_FULFILLED, PUT_UPDATE_BOOK_DATA_PENDING, PUT_UPDATE_BOOK_DATA_REJECTED } from "../constants";

let initialState = {
    booksData: [],
    loading: null,
    error: null,
    booksDataByID: {}
}

let bookslice = createSlice(
    {
        name: 'books',
        initialState: initialState,
        reducers: {


        },
        extraReducers: (builder) => {
            builder
                //get
                .addCase(FETCH_BOOKS_DATA_PENDING, (state) => {
                    state.loading = true
                    state.error = null;
                })
                .addCase(FETCH_BOOKS_DATA_FULFILLED, (state, action) => {
                    state.loading = false;
                    state.booksData = action.payload
                })
                .addCase(FETCH_BOOKS_DATA_REJECTED, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message
                })

                //id
                .addCase(GET_BOOK_DATA_BY_ID_PENDING, (state) => {
                    state.loading = true
                    state.error = null;
                })
                .addCase(GET_BOOK_DATA_BY_ID_FULFILLED, (state, action) => {
                    state.loading = false;
                    state.booksDataByID = action.payload
                })
                .addCase(GET_BOOK_DATA_BY_ID_REJECTED, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message
                })

                //post
                .addCase(POST_ADD_BOOK_DATA_PENDING, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(POST_ADD_BOOK_DATA_FULFILLED, (state) => {
                    state.loading = false;
                })
                .addCase(POST_ADD_BOOK_DATA_REJECTED, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                })

                //delete
                .addCase(DELETE_BOOK_DATA_PENDING, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(DELETE_BOOK_DATA_FULFILLED, (state) => {
                    state.loading = false;
                })
                .addCase(DELETE_BOOK_DATA_REJECTED, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                })


                //put
                .addCase(PUT_UPDATE_BOOK_DATA_PENDING, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(PUT_UPDATE_BOOK_DATA_FULFILLED, (state) => {
                    state.loading = false;
                })
                .addCase(PUT_UPDATE_BOOK_DATA_REJECTED, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                });
        }
    }
)

export const { setBookData } = bookslice.actions;
export default bookslice.reducer;