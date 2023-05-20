import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../components/home/Home'
import DataUsage from '../components/dataUsage/DataUsage'

export default props =>
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/dataUsage' element={<DataUsage />} />
        <Route path='*' element={<Home />} />
    </Routes>