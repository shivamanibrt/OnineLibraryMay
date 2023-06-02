import React from 'react';
import { Link } from 'react-router-dom';
import { PrivatePage } from '../../Pages/PrivatePage/PrivatePage';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const UserLayout = ({ children }) => {
    const { user } = useSelector(state => state.user);

    return (
        <PrivatePage>
            <div className='user-layout'>
                <div className='left p-4 bg-dark text-light shadow-lg'>
                    <Modal.Title className='text-center'>Hi {user?.fName}</Modal.Title>
                    <hr />
                    <div className='sidebar fw-bolder text-center'>
                        <ul className='nav-links'>
                            {user?.role === 'admin' ? (
                                <>
                                    {/* for admin only */}
                                    <li>
                                        <Link to='/dashboard'>Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to='/books'>Books</Link>
                                    </li>
                                    <li>
                                        <Link to='/clients'>Clients</Link>
                                    </li>
                                    <li>
                                        <Link to='/history'>History</Link>
                                    </li>
                                    <li>
                                        <Link to='/user'>User</Link>
                                    </li>
                                    <li>
                                        <Link to='/profile'>Profile</Link>
                                    </li>
                                </>
                            ) : (
                                // for all user types
                                <>
                                    <li>
                                        <Link to='/dashboard'>Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to='/history'>History</Link>
                                    </li>
                                    <li>
                                        <Link to='/user'>User</Link>
                                    </li>
                                    <li>
                                        <Link to='/profile'>Profile</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>

                <div className='right'>
                    <div className='main pt-3 text-dark'>{children}</div>
                </div>
            </div>
        </PrivatePage>
    );
};
