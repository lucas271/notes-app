import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import LoginRegister from './pages/LoginRegister/LoginRegister'
import NotesPage from './pages/NotesPage/NotesPage.js'



const RoutesComponent = () => {


    return <>

        <Router>

            <Routes>    
                {localStorage.getItem("userInfo") ?
                <Route path='/' element={<NotesPage/>}/>
                :
                <Route path="/" element={<LoginRegister/>}/>}   
                
                
            </Routes>
        </Router>
    </>
}

export default RoutesComponent