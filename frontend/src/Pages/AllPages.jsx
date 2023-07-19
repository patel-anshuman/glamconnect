import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Home from "./Home"
import Services from "./Services"
const AllPages = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='*' element={<h1>Page Not Found</h1>}/>
    </Routes>
  )
}

export default AllPages