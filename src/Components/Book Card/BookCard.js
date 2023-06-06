import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchBookByIdAction } from '../../Pages/Book/bookAction';

export const BookCard = (item) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(fetchBookByIdAction(item.id));
        navigate(`/book/${item.id}`);
    };

    return (
        <Card style={{ width: '18rem' }} className='shadow-lg mb-2 rounded'>
            <Card.Img src={item.bookUrl} alt='bookImage' style={{ width: '100%', height: '100%' }} />
            <Card.Body>
                <Card.Title>{item.bookTitle}</Card.Title>
                <Card.Text>{item.summary.slice(0, 200)}...</Card.Text>
                <Button variant="primary" onClick={handleOnClick}>Read More</Button>
            </Card.Body>
        </Card>
    );
};
