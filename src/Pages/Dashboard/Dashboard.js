import React, { useEffect, useState } from 'react';
import { UserLayout } from '../../Components/Layout/UserLayout';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { BookCard } from '../../Components/Book Card/BookCard';
import { getAllbooksAction } from '../Book/bookAction';

export const Dashboard = () => {
    const [searchText, setSearchText] = useState('');
    const { book } = useSelector(state => state.book);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const dispatch = useDispatch();

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
                    <h3 className='text-secondary'>Welcome to Dashboard</h3>

                    <div className="mt-3 p-5 rounded shadow-lg">
                        <Form>
                            <Row className="gap-1">
                                <Col md="9">
                                    <Form.Control
                                        type='text'
                                        placeholder='Search borrowed...'
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                    />
                                </Col>
                                <Col>
                                    <div className="d-grid">
                                        <Button variant='primary' onClick={handleOnSearch}>
                                            Search
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>

                    <Row className="justify-content-center mt-5 gap-3">
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map((item, i) => (
                                <BookCard key={i} {...item} />
                            ))
                        ) : (
                            <div className="d-flex justify-content-center mt-5">
                                <Alert variant="danger">No book found!</Alert>
                            </div>

                        )}
                    </Row>
                </div>
            </UserLayout >
        </>
    );
};
