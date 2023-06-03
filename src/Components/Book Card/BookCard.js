import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const BookCard = (item) => {
    return (
        <Card style={{ width: '18rem' }} className='shadow-lg mb-2 rounded '>
            <Card.Img src={item?.bookUrl} alt='' style={{ width: '100%', height: '100%' }} />
            <Card.Body>
                <Card.Title>{item?.bookTitle}</Card.Title>
                <Card.Text>{item?.summary?.slice(0, 200)}...</Card.Text>
                <Button variant="primary">Borrow this book</Button>
            </Card.Body>
        </Card>
    );
};
