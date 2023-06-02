import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getAllbooksAction } from '../../Pages/Book/bookAction';
import { CustomModal } from '../Custom-Modal/CustomModal';
import { EditBook } from '../Edit-Book/EditBook';
import { setShowModal } from '../../SystemConfig/systemSlice';


export const BookTable = () => {
    const { book } = useSelector(state => state.book);
    const dispatch = useDispatch();

    const [selectedBook, setSelectedBook] = useState({})

    useEffect(() => {
        !book.length && dispatch(getAllbooksAction());
    }, [dispatch, book]);

    const handleOnEdit = (obj) => {

        setSelectedBook(obj);
        dispatch(setShowModal)
    };

    return (
        <Container className='p-2 shadow rounded-3 mt-3'>
            <CustomModal heading='Edit book'>
                <EditBook selectedBook={selectedBook} />
            </CustomModal>

            <Table striped bordered hover responsive className='custom-table'>
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
                                <h3>{item.bookTitle}</h3>
                                <p>{item.authorName} - {item.publishedYear}</p>
                                <p className='summary'>{item?.summary}</p>
                            </td>
                            <td>
                                <Button variant='warning' onClick={() => { handleOnEdit(item) }}>Edit </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};
