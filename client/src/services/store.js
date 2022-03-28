import {createStore, combineReducers, applyMiddleware, } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import notesReducer from './reducers/notesReducer'

const rootReducer = combineReducers({
    userReducer,
    notesReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store