import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import LoginRegister from '../LoginRegister/LoginRegister'

import { useDispatch, useSelector } from "react-redux"

const Routes = () => {
    return <>

        <Router>

            <Router>
                <Route path="/" element={<LoginRegister/>}/>
            </Router>
        </Router>
    </>
}

export default Routes