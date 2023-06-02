import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { CustomInput } from '../../Components/CustomInput/CustomInput';
import { addNewBookAction } from '../../Pages/Book/bookAction';
import { useDispatch } from 'react-redux';

export const EditBook = ({ selectedBook }) => {
    const [addBook, setAddBook] = useState({});
    const dispatch = useDispatch();

    const navigate = useNavigate();


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setAddBook({ ...addBook, [name]: value });
    };

    const handleOnSubmit = async (e) => {
        try {
            e.preventDefault();

            // dispatch(addNewBookAction(addBook));
            navigate('/books');

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
            value: selectedBook.title
        },
        {
            label: 'Published Year',
            name: 'publishedYear',
            type: 'number',
            placeholder: '2018',
            required: true,
        },
        {
            label: 'Book Title',
            name: 'bookTitle',
            type: 'text',
            placeholder: 'Atomic Habits',
            required: true,
        },
        {
            label: 'Book URL',
            name: 'bookUrl',
            type: 'url',
            placeholder: 'http://image-url.com',
            required: true,
        },
        {
            label: 'Summary',
            name: 'summary',
            type: 'text',
            as: 'textarea',
            placeholder: 'Write Book summary',
            style: { height: '200px', resize: 'none' },
            required: true,
        },
    ];

    return (
        <Container>
            <Form
                className="p-1  m-auto"
                style={{ maxWidth: '100%' }}
                onSubmit={handleOnSubmit}
            >
                <div className="mt-2">
                    {inputs.map((item, i) => (
                        <CustomInput key={i} {...item} onChange={handleOnChange} />
                    ))}
                </div>
                <div className="d-grid">
                    <Button variant="primary" type="submit">
                        Update Book
                    </Button>
                </div>
            </Form>

        </Container>

    );
};
