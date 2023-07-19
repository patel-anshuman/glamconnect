import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Home from "./Home"
import Services from "./Services"
import BeautyCategoriesPage from './Categories'
import ProfessionalsPage from './Professionals'
const AllPages = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/categories' element={<BeautyCategoriesPage/>}/>
        <Route path='/categories/professionals' element={<ProfessionalsPage/>}/>

        <Route path='*' element={<h1>Page Not Found</h1>}/>
    </Routes>
  )
}

export default AllPages