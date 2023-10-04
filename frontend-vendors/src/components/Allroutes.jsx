import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EditVendor from '../pages/EditVendor'
import VendorList from './VendorList'

const Allroutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<VendorList/>}></Route>
            <Route path='/edit-vendor/:id' element={<EditVendor/>}></Route>
        </Routes>
    </div>
  )
}

export default Allroutes