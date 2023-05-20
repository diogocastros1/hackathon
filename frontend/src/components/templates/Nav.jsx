import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props => 
    <aside className='menu-area'>
        <nav className='menu'>
            <Link to='/'>
                <i className='fa fa-home'></i> Home
            </Link>
            <Link to='/dataUsage'>
                <i className='fa fa-line-chart'></i> Apps
            </Link>
        </nav>
    </aside>
