import { createSlice } from "@reduxjs/toolkit";
import { addBookData, deleteBookData, fetchBooksData, getBookDataByID, putBookData } from "../actions/bookThunk";

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
                .addCase(fetchBooksData.pending, (state) => {
                    state.loading = true
                    state.error = null;
                })
                .addCase(fetchBooksData.fulfilled, (state, action) => {
                    state.loading = false;
                    state.booksData = action.payload
                })
                .addCase(fetchBooksData.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message
                })

                //get by id
                .addCase(getBookDataByID.pending, (state) => {
                    state.loading = true
                    state.error = null;
                })
                .addCase(getBookDataByID.fulfilled, (state, action) => {
                    state.loading = false;
                    state.booksDataByID = action.payload
                })
                .addCase(getBookDataByID.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message
                })

                //post
                .addCase(addBookData.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(addBookData.fulfilled, (state) => {
                    state.loading = false;
                })
                .addCase(addBookData.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                })

                //delete
                .addCase(deleteBookData.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(deleteBookData.fulfilled, (state) => {
                    state.loading = false;
                })
                .addCase(deleteBookData.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                })


                //put
                .addCase(putBookData.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(putBookData.fulfilled, (state) => {
                    state.loading = false;
                })
                .addCase(putBookData.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                });
        }
    }
)

export const { setBookData } = bookslice.actions;
export default bookslice.reducer;