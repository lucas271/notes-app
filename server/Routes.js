const Router = require('express').Router()

const {loginUser, registerUser} = require('./controllers/userAuthController.js')


Router.post('/loginUser', loginUser)
Router.post('/registerUser', registerUser)


module.exports = Router