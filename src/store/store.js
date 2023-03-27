import produce from "immer"
import {composeWithDevTools} from 'redux-devtools-extension'

import { combineReducers, createStore } from "redux"
import { usersReducer } from "./user/userSlice"
import {productsReducer} from './items/itemsSlice'


const reducer = combineReducers( {
    users:usersReducer,
    products:productsReducer
})
export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())