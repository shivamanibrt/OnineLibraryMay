import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { BookCard } from '../../Components/Book Card/BookCard';
import { getAllbooksAction } from '../Book/bookAction';

export const BooksList = () => {
    const { book } = useSelector(state => state.book);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllbooksAction());
    }, [dispatch]);

    return (
        <div>
            <Container className='text-center'>
                <Row>
                    <h1>{book.length} Books found !</h1>

                </Row>
                <Row className='p-2  mb-2'>
                    {book.map((item) => (
                        <Col key={item.id} className="d-flex gap-2 flex-wrap justify-content-around">
                            <div className="d-flex justify-content-center" >
                                <BookCard {...item} />
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};