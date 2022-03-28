import { NEW_NOTE_REQUEST, NEW_NOTE_FAIL, NEW_NOTE_SUCCESS } from "../constants/notesConstants.js"
import { DELETE_NOTE_REQUEST, DELETE_NOTE_FAIL, DELETE_NOTE_SUCCESS } from "../constants/notesConstants.js"
import { UPDATE_NOTE_REQUEST, UPDATE_NOTE_FAIL, UPDATE_NOTE_SUCCESS } from "../constants/notesConstants.js"


const notesReducer = (state={}, action) => {
    switch (action.type) {
        case NEW_NOTE_REQUEST:
            return state
    
        case NEW_NOTE_SUCCESS:
            return action.payload
        
        case NEW_NOTE_FAIL:
            return action.payload

        case DELETE_NOTE_REQUEST:
            return state
    
        case DELETE_NOTE_SUCCESS:
            return state
        
        case DELETE_NOTE_FAIL:
            return action.payload
        case UPDATE_NOTE_REQUEST:
            return state
    
        case UPDATE_NOTE_SUCCESS:
            return action.payload || 'a'
        
        case UPDATE_NOTE_FAIL:
            return action.payload || 'a'

        default: return state
    }
}

export default notesReducer