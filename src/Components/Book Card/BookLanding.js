import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { UserLayout } from '../Layout/UserLayout';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { createNewBurrowAction, fetchBookByIdAction, getAllbooksAction } from '../../Pages/Book/bookAction';

export const BookLanding = () => {
    const { id } = useParams();
    const { selectedBooks } = useSelector(state => state.book);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const { availableFrom } = selectedBooks;
    const isAvailable = selectedBooks && selectedBooks.availableFrom;

    let todaysDate;

    if (availableFrom) {
        todaysDate = new Date(availableFrom).toLocaleDateString();
    }

    useEffect(() => {
        dispatch(fetchBookByIdAction(id));
        dispatch(getAllbooksAction());
    }, [id, dispatch]);

    const handelOnBorrow = () => {
        const defaultBurrowDay = 4;
        if (user?.uid) {
            const obj = {
                bookId: selectedBooks.id,
                bookName: selectedBooks.bookTitle,
                userId: user.uid,
                name: user.fName,
                burrowTime: Date.now(),
                returnDate: Date.now() + defaultBurrowDay * 24 * 60 * 60 * 1000,
                hasReturned: false,
            };
            dispatch(createNewBurrowAction(obj));
            console.log(obj);
            return;
        }
        alert('Please login to borrow the book');
    };

    return (
        <div>
            <UserLayout>

                <Container className='mt-3 mb-3'>
                    <div className='p-3 shadow-lg'>
                        <Row >
                            <div className="mb-3">
                                {isAvailable ? (
                                    <Button onClick={handelOnBorrow}>Borrow Now</Button>
                                ) : (
                                    <Button variant="warning">Available from: {todaysDate}</Button>
                                )}
                            </div>
                            <h1>{selectedBooks.bookTitle}</h1>
                            <Col xs={12} md={6} lg={4}>
                                <img src={selectedBooks.bookUrl} className="d-block w-100" alt='booksImage' style={{ width: '200px' }} />
                            </Col>
                            <Col xs={12} md={6} lg={8} className='d-flex align-items-center mt-3'>
                                <p>{selectedBooks.summary}</p> </Col>
                        </Row>
                    </div>
                </Container>
            </UserLayout>
        </div>
    );
};
