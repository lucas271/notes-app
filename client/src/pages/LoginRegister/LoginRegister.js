import {useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
import {loginAction} from '../../services/actions/userAction.js'
import {registerAction} from '../../services/actions/userAction.js'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './styles.css'

const LoginRegister = () => {
    const [loginOrRegister, setLoginOrRegister] = useState(true)

    return <>
        <main className='auth-container'>

            {loginOrRegister? 
                <>
                    <Login/>
                    <p className='change-form'>Don't have an account? <span className='login-register-span' onClick={() => setLoginOrRegister(!loginOrRegister)}>Register</span></p>
                </>
                :
                <>
                    <Register/>
                    <p className='change-form'>Already have an account? <span className='login-register-span' onClick={() => setLoginOrRegister(!loginOrRegister)}>Login</span></p>
                </>
                  }

        </main>

    </>
}


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()

    const handleFormSubmit = async  (e) => {
        e.preventDefault()
        const validation = validateForm(email, password)

        if (validation && validation.length > 0){ 
            setErrors(validation)
            return e.preventDefault()
        }

        const getDispatch = await dispatch(loginAction(email, password))
        const user = getDispatch ? getDispatch.payload : ''
        if(user && user.errors) {
            setErrors([user.errors])
            return e.preventDefault()
        }
        window.location.reload()


    }

    return <>
        <form className='auth-form-container' onSubmit={async (e) => await handleFormSubmit(e)}>
            {errors.map(error => {
                return <span key={errors.indexOf(error)} className='error-message'>{error}</span>
            })}
            <h2>LOGIN FORM</h2>
            <TextField  type='email' variant='filled' value={email} onChange={e => setEmail(e.target.value)} label='Email'/>
            <TextField type='password' variant='filled' value={password} onChange={e => setPassword(e.target.value)} label='Password'/>
            <Button type='submit' variant='contained'>SEND</Button>

        </form>
    </>
}

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch()

    const handleFormSubmit = async (e) => {
        const validation = validateForm(email, password, repeatPassword)
        console.log(validation.length)
        if (validation.length > 0) {
            setErrors(validation)
            e.preventDefault()
            return
        }
        e.preventDefault()


        //quick solution for the project, still a crime. PLEASE disconsider this project (I was trying redux).
        const getDispatch = await dispatch(registerAction(email, password, repeatPassword))
        const user = getDispatch ? getDispatch.payload[0] : ''
        console.log(user.errors)

        if(user && user.errors) {
            setErrors([user.errors])
            return e.preventDefault()
        }

        window.location.reload()
    }


    return <>
        <form className='auth-form-container auth-form-register' action="/" onSubmit={(e) => handleFormSubmit(e)}>
            {errors.map(error => {
                return <span key={errors.indexOf(error)} className='error-message'>{error}</span>
            })}
            <h2>REGISTER FORM</h2>
            <TextField  type='email' variant='filled' value={email} onChange={e => setEmail(e.target.value)} label='Email'/>
            <TextField type='password' variant='filled' value={password} onChange={e => setPassword(e.target.value)} label='Password'/>
            <TextField type='password' variant='filled' value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} label='Repeat Password'/>
            <Button type='submit' variant='contained'>SEND</Button>

        </form>
    </>
}


const validateForm= (email, password, repeatPassword=null) => {
    const errors = []

    if (!email || !password) {
        errors.push('Empty spaces')
        return errors
    }

    if(password.length > 20) {
        errors.push('password cannot be longer than 20 chars')
        return errors
    }
    if(password.length < 6) {
        errors.push('password cannot be smaller than 6 chars')
        return errors
    }

    //validation for register
    if(repeatPassword === null) return
    
    if(repeatPassword === '') {
        errors.push('repeatPassword empty')
        return errors
    }
    if(repeatPassword !== password) {
        errors.push('passwords must match')
        return errors
    }
    return errors
}

export default LoginRegister



















