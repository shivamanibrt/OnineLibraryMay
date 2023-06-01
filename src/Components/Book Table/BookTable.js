import React, { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getAllbooksAction } from '../../Pages/Book/bookAction';


export const BookTable = () => {
    const { book } = useSelector(state => state.book);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllbooksAction()); // Dispatch the action to fetch the books from Firestore
    }, [dispatch]);

    const handleOnEdit = (e, item) => {
        e.preventDefault();
        // Add your edit logic here
    };

    return (
        <Container className='p-2 shadow rounded-3'>


            <Table striped bordered hover responsive >
                <thead>
                    <tr>
                        <th>Thumbnail</th>
                        <th>Info</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {book.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <img src={item.bookUrl} alt='' />
                            </td>
                            <td>
                                <h3>Title : {item.bookTitle}</h3>
                                <p>{item.authorName} - {item.publishedYear}</p>
                                <p>{item?.summary}</p>
                            </td>
                            <td>
                                <Button variant='warning' onClick={(e) => handleOnEdit(e)}>Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};
