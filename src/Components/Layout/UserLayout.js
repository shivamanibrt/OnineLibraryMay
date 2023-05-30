import React from 'react'
import { Link } from 'react-router-dom'
import { PrivatePage } from '../../Pages/PrivatePage/PrivatePage'
import { ModalTitle } from 'react-bootstrap'


export const UserLayout = ({ children }) => {
    return (
        <PrivatePage>
            <div className='user-layout'>
                <div className='left p-4 bg-dark text-light shadow-lg'>
                    <ModalTitle className='text-center'>User Name</ModalTitle>
                    <hr />
                    <div className='sidebar fw-bolder text-center'>
                        <ul className='nav-links'>
                            {/* for admin only */}
                            <li>
                                <Link to='/books'>Books</Link>
                            </li>
                            <li>
                                <Link to='/clients'>Clients</Link>
                            </li>
                            {/* for all user types */}
                            <li>
                                <Link to='/history'>History</Link>
                            </li>
                            <li>
                                <Link to='/user'>User</Link>
                            </li>
                            <li>
                                <Link to='/profile'>Profile</Link>
                            </li>
                        </ul>
                    </div >
                </div >

                <div div className="right" >
                    <div className="main pt-3 text-dark">{children}</div>
                </div >

            </div >
        </PrivatePage>
    )
}
