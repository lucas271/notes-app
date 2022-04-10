import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../constants/userConstants"
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants"
import { USER_LOGOUT_REQUEST, USER_LOGOUT_FAIL, USER_LOGOUT_SUCCESS} from '../constants/userConstants'


const userReducer = (state={}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return action.payload
    
        case USER_LOGIN_SUCCESS:
            return action.payload
        
        case USER_LOGIN_FAIL:
            return action.payload

        case USER_REGISTER_REQUEST:
            return action.payload

        case USER_REGISTER_SUCCESS:
            return action.payload
            
        case USER_REGISTER_FAIL:
            return action.payload
        
        case USER_LOGOUT_REQUEST:
            return action.payload

        case USER_LOGOUT_SUCCESS:
            return action.payload
            
        case USER_LOGOUT_FAIL:
            return action.payload



        default: return state
    }
}

export default userReducer