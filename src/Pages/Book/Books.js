import React from 'react';

import { UserLayout } from '../../Components/Layout/UserLayout';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BookTable } from '../../Components/Book Table/BookTable';
import { useSelector } from 'react-redux';


export const Books = () => {
    const { user } = useSelector(state => state.user);

    if (user.role !== 'admin') {
        return (
            <UserLayout>
                <h1>Unauthorize access</h1>
            </UserLayout>
        );
    }
    return (
        <>
            <UserLayout>
                <div className='p-2 text-center'>
                    <h3>
                        Books Components
                    </h3>
                    <hr />
                    <div >

                        <Container className='mt-3 text-start' >
                            <Link to='/newBooks'>
                                <Button>Add New Books</Button>
                            </Link>
                            <BookTable />
                        </Container>
                    </div>
                </div>

            </UserLayout >
        </>
    );
};
