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

    const { availableFrom, isAvailable } = selectedBooks;

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
                <Container>
                    <div className="book-layout p-3 mb-2 shadow-lg">
                        <div className="mb-3">
                            {!user?.uid ? (
                                <Button disabled={!user?.uid}>Login to borrow</Button>
                            ) : isAvailable ? (
                                <Button onClick={handelOnBorrow}>Borrow Now</Button>
                            ) : (
                                <Button variant="warning">Available from: {todaysDate}</Button>
                            )}
                        </div>

                        <Row>
                            <Col>
                                <img src={selectedBooks.bookUrl} alt="bookImage" style={{ width: '100%', height: '100%' }} />
                            </Col>
                            <Col>
                                <h1>{selectedBooks.bookTitle}</h1>
                                <p>{selectedBooks.summary}</p>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </UserLayout>
        </div>
    );
};
