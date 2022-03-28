import axios from 'axios'
import { USER_LOGIN_REQUEST, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS } from '../constants/userConstants'
import { USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS } from '../constants/userConstants'
import { USER_LOGOUT_REQUEST, USER_LOGOUT_FAIL, USER_LOGOUT_SUCCESS} from '../constants/userConstants'

const config = {
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: 'include',
}

export const loginAction = (email, password) => {
    return async dispatch => {
        try {
            dispatch({ type: USER_LOGIN_REQUEST})


            const {data} = await axios.post(
                'http://localhost:3001/loginUser',
                {email, password},
                config
            )
    
            console.log('a')

            if(data.errors) return dispatch({type: USER_REGISTER_FAIL, payload: [data]})


            dispatch(
                {type: USER_LOGIN_SUCCESS, payload: data}
            )
    
            localStorage.setItem("userInfo", JSON.stringify(data))
        } catch (error) {

            dispatch({
                type: USER_LOGIN_FAIL,
                payload: [error.status]
            })
        }
    }
}


export const registerAction = (email, password, repeatPassword) => {
    return async dispatch => {
        try {
            dispatch({ type: USER_REGISTER_REQUEST})
            if(!repeatPassword) return dispatch({type: USER_REGISTER_FAIL, payload: ['emptyFields']})
            const {data} = await axios.post(
                'http://localhost:3001/registerUser',
                {email, password, repeatPassword},
                config
                )

            if(data.errors) return dispatch({type: USER_REGISTER_FAIL, payload: [data]})

            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data
            })
            localStorage.setItem("userInfo", JSON.stringify(data))
        } catch (error) {
            dispatch({type: USER_REGISTER_FAIL, payload: ['error']})        

        }
    }
}

export const logoutAction = () => {
    return async dispatch => {

        try {
            dispatch({type: USER_LOGOUT_REQUEST})


            const {data} = await axios.post('http://localhost:3001/logoutUser', {}, config)

            console.log(data)

            if(data.errors) return dispatch({type: USER_LOGOUT_FAIL, payload: [data]})
    
            localStorage.removeItem("userInfo")

            dispatch({type: USER_LOGOUT_SUCCESS, payload: data})
            
        } catch (error) {
            console.log(error)
            dispatch({type: USER_LOGOUT_FAIL, payload: ['error']})        
        }



    }
}