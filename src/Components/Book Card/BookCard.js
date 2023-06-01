import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const BookCard = (item) => {
    return (
        <Card style={{ width: '18rem', height: '200px', marginBottom: '20px' }}>
            <Card.Img variant="top" src={item?.url} />
            <Card.Body>
                <Card.Title>{item?.bookTitle}</Card.Title>
                <Card.Text>{item?.summary?.slice(0, 80)}...</Card.Text>
                <Button variant="primary">Borrow this book</Button>
            </Card.Body>
        </Card>
    );
};
