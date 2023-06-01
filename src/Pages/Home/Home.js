import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { HomeCarousel } from './HomeCarousel';
import { BookCard } from '../../Components/Book Card/BookCard';
import { getAllbooksAction } from '../Book/bookAction';

export const Home = () => {
    const { book } = useSelector(state => state.book);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllbooksAction());
    }, [dispatch]);

    return (
        <div>
            <HomeCarousel />
            <Container className='text-center'>
                <Row>
                    <h1>{book.length} Books found !</h1>
                    <hr />
                </Row>
                <Row>
                    {book.map((item) => (
                        <Col className="d-flex gap-2 flex-wrap justify-content-around">
                            <div className="d-flex justify-content-center">
                                <BookCard {...item} />
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};
