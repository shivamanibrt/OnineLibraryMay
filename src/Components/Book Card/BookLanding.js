import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { UserLayout } from '../Layout/UserLayout';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { createNewBurrowAction, fetchBookByIdAction } from '../../Pages/Book/bookAction';

export const BookLanding = () => {
    const { id } = useParams();
    const { selectedBooks } = useSelector((state) => state.book);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user)

    const { isAvailable, returnDate } = selectedBooks;
    useEffect(() => {
        dispatch(fetchBookByIdAction(id));
    }, [id, dispatch]);

    const handelOnBorrow = () => {
        const defaultburrowDay = 14;
        if (user?.uid) {
            const obj = {
                bookId: selectedBooks?.id,
                bookName: selectedBooks.bookTitle,
                userId: user?.uid,
                hasReturned: false,
                burrowTime: Date.now(),
                returnDate: Date.now() + (defaultburrowDay * 24 * 60 * 60 * 1000)
            }
            dispatch(createNewBurrowAction(obj));
            console.log(obj);
            return;
        }
        alert('Please login to burrow the book')

    }

    return (
        <div>
            <UserLayout>
                <Container className=''>

                    <div className='book-layout p-3 mb-2 shadow-lg'>
                        {!user?.uid ? (
                            <Button className='mb-3' onClick={handelOnBorrow}>Login to borrow book</Button>
                        ) : (
                            isAvailable ? (
                                <Button className='mb-3' onClick={handelOnBorrow}>Borrow this book</Button>
                            ) : (
                                <Button className='mb-3'>Available from : 10{returnDate}</Button>
                            )
                        )}
                        <Row>
                            <Col>
                                <img src={selectedBooks.bookUrl} alt='bookImage' style={{ width: '100%', height: '100%' }} />
                            </Col>
                            <Col>
                                <h1>{selectedBooks.bookTitle}</h1>
                                <p>{selectedBooks.summary}</p>
                            </Col>
                        </Row>
                    </div>

                </Container>
            </UserLayout>
        </div >
    );
};
