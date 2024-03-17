//! step 1 : npm install redux-saga
//  import call and put
// call - to make http request
//  put - dispatch actions based on the result of the request

//!step 2 : Saga Function for Fetching Books

// import { call, put, takeLatest } from 'redux-saga/effects'
// import { FETCH_BOOKS_DATA } from '../constants'

// function* fetchBooksData() {
// try {
// const response = yield call(axios.get, '${MASTER_URL}/getbooks')
// yield put({ type: FETCH_BOOKS_DATA.fulfilled, payload: response.data })
// } catch (error) {
// yield put({ type: FETCH_BOOKS_DATA.rejected, error: error.message })
// }
// }

// !step 3: define a watcher saga that listens for a specific action
// takelatest - This helps prevent race conditions
//  It allows you to handle multiple instances of the same action
//  type concurrently but only takes the latest one into account, cancelling any previous ones.

// function* watchfetchBooksData() {
// yield takeLatest(FETCH_BOOKS_DATA.pending, fetchBooksData)
// }

//! step 4: Combine Sagas or rootsaga - run by the Saga middleware to handle all the asynchronous actions
// export default function* bookSaga(){
// yield[
// watchfetchBooksData(),
// ]
// }




import axios from 'axios'
import {
    call,
    put,
    takeLatest,
    all
} from 'redux-saga/effects'
import {
    DELETE_BOOK_DATA_FULFILLED,
    DELETE_BOOK_DATA_PENDING,
    DELETE_BOOK_DATA_REJECTED,
    FETCH_BOOKS_DATA_FULFILLED, FETCH_BOOKS_DATA_PENDING, FETCH_BOOKS_DATA_REJECTED, GET_BOOK_DATA_BY_ID_FULFILLED, GET_BOOK_DATA_BY_ID_PENDING, GET_BOOK_DATA_BY_ID_REJECTED, POST_ADD_BOOK_DATA_FULFILLED, POST_ADD_BOOK_DATA_PENDING, POST_ADD_BOOK_DATA_REJECTED, PUT_UPDATE_BOOK_DATA_FULFILLED, PUT_UPDATE_BOOK_DATA_PENDING, PUT_UPDATE_BOOK_DATA_REJECTED
} from '../constants'
import { MASTER_URL } from '../../apiService'

//get
function* fetchBooksData() {
    try {
        const response = yield call(axios.get, `${MASTER_URL}/getbooks`)
        console.log(response.data);
        yield put({
            type: FETCH_BOOKS_DATA_FULFILLED,
            payload: response.data
        })
    }
    catch (error) {
        yield put({
            type: FETCH_BOOKS_DATA_REJECTED,
            error: error.message
        })
    }
}

function* watchfetchBooksData() {
    yield takeLatest(FETCH_BOOKS_DATA_PENDING, fetchBooksData)
}


//getbyid
function* fetchBookByID(action) {
    try {
        const response = yield call(axios.get, `${MASTER_URL}/getbooks/${action.payload}`);
        yield put({ type: GET_BOOK_DATA_BY_ID_FULFILLED, payload: response.data });
    } catch (error) {
        yield put({ type: GET_BOOK_DATA_BY_ID_REJECTED, error: error.message });
    }
}

function* watchFetchBookByID() {
    yield takeLatest(GET_BOOK_DATA_BY_ID_PENDING, fetchBookByID);
}

function* addBook(action) {
    try {
        const response = yield call(axios.post, `${MASTER_URL}/addbook`, action.payload);
        yield put({ type: POST_ADD_BOOK_DATA_FULFILLED, payload: response.data });
    } catch (error) {
        yield put({ type: POST_ADD_BOOK_DATA_REJECTED, error: error.message });
    }
}

function* watchAddBook() {
    yield takeLatest(POST_ADD_BOOK_DATA_PENDING, addBook);
}

function* deleteBook(action) {
    try {
        const response = yield call(axios.delete, `${MASTER_URL}/removebook/${action.payload}`);
        yield put({ type: DELETE_BOOK_DATA_FULFILLED, payload: response.data });
    } catch (error) {
        yield put({ type: DELETE_BOOK_DATA_REJECTED, error: error.message });
    }
}

function* watchDeleteBook() {
    yield takeLatest(DELETE_BOOK_DATA_PENDING, deleteBook);
}



function* updateBook(action) {
    try {
        const { id, formData } = action.payload;
        const response = yield call(axios.put, `${MASTER_URL}/updatebook/${id}`, formData);
        yield put({ type: PUT_UPDATE_BOOK_DATA_FULFILLED, payload: response.data });
    } catch (error) {
        yield put({ type: PUT_UPDATE_BOOK_DATA_REJECTED, error: error.message });
    }
}

function* watchUpdateBook() {
    yield takeLatest(PUT_UPDATE_BOOK_DATA_PENDING, updateBook);
}



export default function* boookSaga() {
    yield all([
        watchfetchBooksData(),
        watchFetchBookByID(),
        watchAddBook(),
        watchDeleteBook(),
        watchUpdateBook()
    ])
}
