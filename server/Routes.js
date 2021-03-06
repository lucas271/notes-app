const Router = require('express').Router()

const {loginUser, registerUser, logoutUser} = require('./controllers/userAuthController.js')
const{newNote, updateNote, deleteNote} = require('./controllers/notesController.js')

//userAuth
Router.post('/loginUser', loginUser)
Router.post('/registerUser', registerUser)
Router.post('/logoutUser', logoutUser)

//userNotes
Router.put('/newNote', newNote)
Router.put('/updateNote', updateNote)
Router.put('/deleteNote', deleteNote)


module.exports = Router