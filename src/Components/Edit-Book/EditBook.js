import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { CustomInput } from '../../Components/CustomInput/CustomInput';
import { useDispatch } from 'react-redux';
import { updateBookDetail } from '../../Pages/Book/bookAction';

export const EditBook = ({ selectedBook }) => {
    const [editBook, setEditBook] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        setEditBook(selectedBook);
    }, [selectedBook]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setEditBook({ ...editBook, [name]: value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateBookDetail(selectedBook.id, editBook));
        } catch (error) {
            toast.error(error.message);
        }
    };

    const inputs = [
        {
            label: 'Author Name',
            name: 'authorName',
            type: 'text',
            placeholder: 'James Clear',
            required: true,
            value: editBook.authorName || ''
        },
        {
            label: 'Published Year',
            name: 'publishedYear',
            type: 'number',
            placeholder: '2018',
            required: true,
            value: editBook.publishedYear || ''
        },
        {
            label: 'Book Title',
            name: 'bookTitle',
            type: 'text',
            placeholder: 'Atomic Habits',
            required: true,
            value: editBook.bookTitle || ''
        },
        {
            label: 'Book URL',
            name: 'bookUrl',
            type: 'url',
            placeholder: 'http://image-url.com',
            required: true,
            value: editBook.bookUrl || ''
        },
        {
            label: 'Summary',
            name: 'summary',
            type: 'text',
            as: 'textarea',
            placeholder: 'Write Book summary',
            style: { height: '200px', resize: 'none' },
            required: true,
            value: editBook.summary || ''
        }
    ];

    return (
        <Container>
            <Form className="p-1 m-auto" style={{ maxWidth: '100%' }} onSubmit={handleOnSubmit}>
                <div className="mt-2">
                    {inputs.map((item, i) => (
                        <CustomInput key={i} {...item} onChange={handleOnChange} />
                    ))}
                </div>
                <div className="d-grid">
                    <Button variant="warning" type="submit">
                        Update Book
                    </Button>
                </div>
            </Form>
        </Container>
    );
};
