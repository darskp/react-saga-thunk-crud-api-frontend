import { combineReducers } from "@reduxjs/toolkit"
import bookSagaSlice from "./bookSagaSlice"
import bookThunkSlice from "./bookThunkSlice"

export default combineReducers({
    // books: bookThunkSlice
    books:bookSagaSlice
}
)
