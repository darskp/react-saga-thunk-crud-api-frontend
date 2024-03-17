import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import createSagaMiddleware from 'redux-saga'
import boookSaga from "./actions/bookSaga";

//thunk config
// export default configureStore({
//     reducer: rootReducer,
//     middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
// })


//saga config
const sagaMiddleware=createSagaMiddleware();
export default configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})
sagaMiddleware.run(boookSaga);
