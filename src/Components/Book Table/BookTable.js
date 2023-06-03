import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookAction, getAllbooksAction } from '../../Pages/Book/bookAction';
import { CustomModal } from '../Custom-Modal/CustomModal';
import { EditBook } from '../Edit-Book/EditBook';
import { setShowModal } from '../../SystemConfig/systemSlice';
import { GrEdit } from 'react-icons/gr'
import { AiFillDelete } from 'react-icons/ai'

export const BookTable = () => {
    const { book } = useSelector(state => state.book);
    const dispatch = useDispatch();

    const [selectedBook, setSelectedBook] = useState({});

    useEffect(() => {
        !book.length && dispatch(getAllbooksAction());
    }, [dispatch, book]);

    const handleOnEdit = (obj) => {
        setSelectedBook(obj);
        dispatch(setShowModal(true));
    };

    const handleOnDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            dispatch(deleteBookAction(id));
        }
    };

    return (
        <Container className='p-2 shadow rounded-3 mt-3'>
            <CustomModal heading='Edit book'>
                <EditBook selectedBook={selectedBook} />
            </CustomModal>
            <Row>
                <h1>{book.length} Books found</h1>
            </Row>
            <Table striped bordered hover responsive className='custom-table'>
                <thead>
                    <tr>

                        <th>Thumbnail</th>
                        <th>Info</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {book.map((item, i) => (
                        <tr key={item.id}>

                            <td>
                                <img src={item.bookUrl} alt='' style={{ width: '100%', height: '100%' }} />
                            </td>
                            <td>
                                <h3> {item.bookTitle}</h3>
                                <p>{item.authorName} - {item.publishedYear}</p>
                                <p className='summary bg-light p-2'>{item?.summary}</p>
                            </td>
                            <td className='edit-column'>
                                <p className='text-center text-secondary'>Book Number {i + 1}<hr /></p>
                                <Row>
                                    <Col className='mb-4'>
                                        <Button variant='warning' className='p-3 fs-5 text-bg-lights' onClick={() => handleOnEdit(item)}><GrEdit /></Button>
                                    </Col>
                                    <Col>
                                        <Button variant='danger' className='p-3 fs-5' onClick={() => handleOnDelete(item.id)}>
                                            <AiFillDelete />
                                        </Button>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};
