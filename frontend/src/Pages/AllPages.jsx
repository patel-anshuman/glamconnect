import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Home from "./Home"
import Services from "./Services"
import BeautyCategoriesPage from './Categories'
import ProfessionalsPage from './Professionals'
import Signup from './Signup'
import Login from './Login'
import Appointment from './Appointment'

const AllPages = ({baseServerURL}) => {
  return (
    <Routes>
        <Route path='/' element={<Home baseServerURL={baseServerURL}/>}/>
        <Route path='/signup' element={<Signup baseServerURL={baseServerURL}/>}/>
        <Route path='/login' element={<Login baseServerURL={baseServerURL}/>}/>
        <Route path='/services' element={<Services baseServerURL={baseServerURL}/>}/>
        <Route path='/categories' element={<BeautyCategoriesPage baseServerURL={baseServerURL}/>}/>
        <Route path="/login" element={<Signup baseServerURL={baseServerURL}/>}/>
        <Route path='/categories/professionals' element={<ProfessionalsPage baseServerURL={baseServerURL}/>}/>
        <Route path='/appointment/:id' element={<Appointment baseServerURL={baseServerURL}/>}/>
        <Route path='*' element={<h1>Page Not Found</h1>}/>
    </Routes>
  )
}

export default AllPages