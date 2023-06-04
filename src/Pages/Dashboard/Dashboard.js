import React, { useEffect, useState } from 'react';
import { UserLayout } from '../../Components/Layout/UserLayout';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Alert, Row, Col, Container } from 'react-bootstrap';
import { BookCard } from '../../Components/Book Card/BookCard';
import { getAllbooksAction } from '../Book/bookAction';
import { SlUserFollowing } from 'react-icons/sl';
import { IoIosBook } from 'react-icons/io';
import { BsSearch } from 'react-icons/bs';

export const Dashboard = () => {
    const [searchText, setSearchText] = useState('');
    const { book } = useSelector(state => state.book);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllbooksAction());
    }, [dispatch]);

    const handleOnSearch = () => {
        const filteredBooks = book.filter((item) => {
            const bookTitle = item.bookTitle.toLowerCase();
            return bookTitle.includes(searchText.toLowerCase());
        });

        setFilteredBooks(filteredBooks);
    };

    return (
        <>
            <UserLayout>
                <div className='p-2'>
                    <div>
                        <h3 className='text-secondary'>Welcome to Dashboard</h3>
                        <p className='text-secondary'>{user?.role.toUpperCase()} /  Dashboard</p>
                    </div>

                    <Container className='mb-3'>
                        <Row className="d-flex flex-wrap gap-3 align-items-center">
                            <Col className="shadow-lg text-light p-3 d-flex justify-content-between gap-3">
                                <div className='bg-warning rounded p-3 shadow d-flex align-items-center'>
                                    <SlUserFollowing style={{ fontSize: '2rem' }} />
                                </div>
                                <div className='text-dark p-3'>
                                    Logged user 10
                                </div>
                            </Col>
                            <Col className="shadow-lg text-light p-3 d-flex justify-content-between gap-3">
                                <div className='bg-danger rounded p-3 shadow d-flex align-items-center'>
                                    <IoIosBook style={{ fontSize: '2rem' }} />
                                </div>
                                <div className='text-dark p-3'>
                                    Total books {book.length}
                                </div>
                            </Col>
                            <Col className="shadow-lg text-light p-3 d-flex justify-content-between gap-3">
                                <div className='bg-primary rounded p-3 shadow-lg d-flex align-items-center'>
                                    <BsSearch style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={handleOnSearch} />
                                </div>
                                <div className='text-dark p-3'>
                                    <Form.Control
                                        type='text'
                                        placeholder='Search borrowed...'
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <Row className="justify-content-center mt-5 gap-3">
                    {filteredBooks.map((item, i) => (
                        <BookCard key={i} {...item} />
                    ))}
                </Row>
            </UserLayout>
        </>
    );
};
