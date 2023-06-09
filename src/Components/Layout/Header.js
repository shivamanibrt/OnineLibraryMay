import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosBook } from 'react-icons/io';
import { GoSignIn } from 'react-icons/go';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import { ImBooks } from 'react-icons/im';
import { FcAbout } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../../Config/firebase-config';
import { setUser } from '../../Pages/Redux/User/userSlice';
import { toast } from 'react-toastify';

export const Header = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                dispatch(setUser({}));
                toast.success('User logged out');
                navigate('/signIn');
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <Navbar collapseOnSelect expand="lg" style={{ fontSize: '30px' }} className='nav-bar' >
            <Container>
                <Navbar.Brand as={Link} to="/" style={{ fontSize: '30px' }} >
                    <IoIosBook className='icon-light' />SLibrary
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll></Nav>
                    <Nav>
                        {user?.uid ? (
                            <>
                                <Nav.Link as={Link} to="/booksList" >
                                    <ImBooks className='icon-light' /> Books
                                </Nav.Link>
                                <Nav.Link as={Link} to="/dashboard">
                                    <AiOutlineDashboard className='icon-light' /> Dashboard
                                </Nav.Link>

                                <Nav.Link as={Link} to="/about">
                                    <FcAbout className='icon-light' /> About
                                </Nav.Link>
                                <Nav.Link as={Link} to="/" onClick={handleLogout}>
                                    <FiLogOut className='icon-light' /> Logout
                                </Nav.Link>


                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/booksList" >
                                    <ImBooks className='icon-light' /> Books
                                </Nav.Link>
                                <Nav.Link as={Link} to="/about">
                                    <FcAbout className='icon-light' /> About
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signIn" >
                                    <GoSignIn className='icon-light' /> SignIn
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signUp">
                                    <IoIosCreate className='icon-light' /> SignUp
                                </Nav.Link>

                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};


