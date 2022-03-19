import { GET_USER, LOGIN } from "../constants/userConstants"

const userReducer = (state='', action) => {
    switch (action.type) {
        case LOGIN:
            return action.payload
    
        case REGISTER:
            return action.payload

        default: return state
    }
}

export default userReducer