import React from 'react';
import { Link } from 'react-router-dom';
import { PrivatePage } from '../../Pages/PrivatePage/PrivatePage';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AiFillDashboard } from 'react-icons/ai';
import { FiBook } from 'react-icons/fi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { FaHistory } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

export const UserLayout = ({ children }) => {
    const { user } = useSelector(state => state.user);

    return (
        <PrivatePage>
            <div className='user-layout'>
                <div className='left  '>
                    <Modal.Title className='text-center text-secondary mt-4'>Hi {user?.fName} !</Modal.Title>

                    <div className='sidebar fw-bolder text-center'>
                        <ul className='nav-links'>
                            {user?.role === 'admin' ? (
                                <>
                                    {/* for admin only */}
                                    <li className='nav-item'>
                                        <Link to='/dashboard' className='nav-link'>
                                            <AiFillDashboard size={25} />

                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link to='/books' className='nav-link'>
                                            <FiBook size={25} />

                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link to='/clients' className='nav-link'>
                                            <AiOutlineUserAdd size={25} />

                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link to='/history' className='nav-link'>
                                            <FaHistory size={25} />

                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link to='/user' className='nav-link'>
                                            <AiOutlineUsergroupDelete size={30} />

                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link to='/profile' className='nav-link'>
                                            <ImProfile size={30} />
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                // for all user types
                                <>
                                    <li className='nav-item'>
                                        <Link to='/dashboard' className='nav-link'>
                                            <AiFillDashboard size={25} />

                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link to='/history' className='nav-link'>
                                            <FaHistory size={25} />

                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link to='/user' className='nav-link'>
                                            <AiOutlineUsergroupDelete size={30} />

                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link to='/profile' className='nav-link'>
                                            <ImProfile size={30} />
                                        </Link>
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
