const express = require('express')
const app = express()
const cors = require('cors')

const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const session = require('express-session')

const Routes = require('./Routes')

require('dotenv').config()

app.use(cors({
    origin: process.env.CLIENT,
    credentials: true
}))


app.use(express.urlencoded({extended: true}))
app.use(express.json())

const sessionConfig = session({
    secret: 'cookie_secret',
    store: MongoStore.create({mongoUrl: process.env.DATABASE}),
    saveUninitialized: false,
    resave: true,
    cookie: {
        httpOnly: true,
        secure:false
    }
})

app.use(sessionConfig)

app.use(Routes)

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(process.env.PORT, () => console.log('server running'))
})
.catch(() => console.log('could not connect to DB'))

