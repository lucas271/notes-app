import axios from "axios"
import { NEW_NOTE_REQUEST, NEW_NOTE_FAIL, NEW_NOTE_SUCCESS} from "../constants/notesConstants.js"
import { DELETE_NOTE_REQUEST, DELETE_NOTE_FAIL, DELETE_NOTE_SUCCESS } from "../constants/notesConstants.js"
import { UPDATE_NOTE_REQUEST, UPDATE_NOTE_FAIL, UPDATE_NOTE_SUCCESS } from "../constants/notesConstants.js"


const config = {
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: 'include',
}

export const newNoteAction = ({user}, {note}) => {
    return async dispatch => {
        try {
            dispatch({type: NEW_NOTE_REQUEST})

            console.log(note)
            const {data} = await axios.put('http://localhost:3001/newNote', {user, note}, config)

            if(data.errors) return dispatch({type: NEW_NOTE_FAIL, payload: [data.errors]})


            console.log(data)

            dispatch({type: NEW_NOTE_SUCCESS, payload: data})

            const updatedUser = JSON.parse(localStorage.getItem("userInfo"))
            updatedUser.posts.push(data.note)

            localStorage.setItem("userInfo", JSON.stringify(updatedUser))
        } catch (error) {
            dispatch({type: NEW_NOTE_FAIL, payload: ['error']})
        }
    }
}

export const deleteNoteAction = ({user}, {deleteNote}) => {
    return async dispatch => {
        try {
            dispatch({type: DELETE_NOTE_REQUEST})

            const {data} = await axios.put('http://localhost:3001/deleteNote', {user, deleteNote}, config)

            if(data.errors) return dispatch({type: DELETE_NOTE_FAIL, payload: [data.errors]})

            dispatch({type: DELETE_NOTE_SUCCESS, payload: data.message})


            const updatedUser = JSON.parse(localStorage.getItem("userInfo"))
            const filterUndeletedNotes = updatedUser.posts.filter(item => item.id !== deleteNote.id)
            updatedUser.posts = filterUndeletedNotes


            localStorage.setItem("userInfo", JSON.stringify(updatedUser))

        } catch (error) {
            dispatch({type: DELETE_NOTE_FAIL, payload: ['error']})
        }
    }
}


export const updateNoteAction = ({user}, {updateNote}) => {
    return async dispatch => {
        try {
            dispatch({type: UPDATE_NOTE_REQUEST})

            console.log(updateNote)


            const {data} = await axios.put('http://localhost:3001/updateNote', {user, updateNote}, config)

            if(data.errors) return dispatch({type: UPDATE_NOTE_FAIL, payload: [data.errors]})

            dispatch({type: UPDATE_NOTE_SUCCESS, payload: data.message})

            const updatedUser = JSON.parse(localStorage.getItem("userInfo"))
            const filterUndeletedNotes = updatedUser.posts.filter(item => item.id !== updateNote.id)

            filterUndeletedNotes.push(updateNote)

            updatedUser.posts = filterUndeletedNotes

            localStorage.setItem("userInfo", JSON.stringify(updatedUser))

        } catch (error) {
            dispatch({type: UPDATE_NOTE_FAIL, payload: ['error']})
        }
    }
}