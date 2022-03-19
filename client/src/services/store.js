import {createStore, combineReducers, applyMiddleware, } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
    userReducer,
    
})

const store = createStore(combineReducers, applyMiddleware(thunk))

export default store