const Router = require('express').Router()

const {loginUser, registerUser} = require('./controllers/userAuthController.js')
const{newNote, updateNote, deleteNote} = require('./controllers/notesController.js')

//userAuth
Router.post('/loginUser', loginUser)
Router.post('/registerUser', registerUser)


//userNotes
Router.post('/newNote', newNote)
Router.put('/updateNote', updateNote)
Router.delete('/deleteNote', deleteNote)


module.exports = Router