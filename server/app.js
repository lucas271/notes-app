const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

app.use(cors({
    origin: process.env.CLIENT,
    credentials: true
}))


app.use(express.urlencoded({extended: true}))
app.use(express.json())

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(process.env.PORT, () => console.log('server running'))
})
.catch(() => console.log('could not connect to DB'))

