const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    notes: {type: Array, default: []}
})

const UserModel = mongoose.model('users', UserSchema)

class User {
    constructor(body){
        this.body = body,
        this.errors = [],
        this.user = null
    }

    async login(){
        this.userValidation()
        if(this.errors.length > 0) return

        const checkIfUserExists = await UserModel.findOne({email: this.body.email})
        if(!checkIfUserExists) return this.errors.push('user does not exist')

        const checkIfPasswordsMatch = bcrypt.compareSync(this.body.password, checkIfUserExists.password)

        if(!checkIfPasswordsMatch) return this.errors.push('wrong password')

        this.user = checkIfUserExists
    }

    async register(){
        this.userValidation()
        if(this.errors.length > 0) return

        const checkIfUserExists = await UserModel.findOne({email: this.body.email})
        if(checkIfUserExists) return this.errors.push('user already exists')

        console.log(checkIfUserExists)

        const hashedPassword = bcrypt.hashSync(this.body.password, 6)

        this.user = await UserModel.create({email: this.body.email, password:hashedPassword})

    }

    userValidation(){
        if (!this.body.email || !this.body.password) return this.errors.push('Empty spaces')

        if(!validator.isEmail(this.body.email)) this.errors.push('invalid Email')
        if(this.body.password.length > 20) this.errors.push('password cannot be longer than 20 chars')
        if(this.body.password.length < 6) this.errors.push('password cannot be smaller than 20 chars')

        //validation for register
        if(!this.body.repeatPassword) return 
        if(this.body.repeatPassword !== this.body.password) return this.errors.push('passwords must match')
    }
}

module.exports = User