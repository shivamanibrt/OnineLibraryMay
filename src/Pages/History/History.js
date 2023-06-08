import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { burrowBooksAction } from '../Book/bookAction';
import { UserLayout } from '../../Components/Layout/UserLayout';

export const History = () => {
    const { burrowBooksHistory } = useSelector((state) => state.book);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(burrowBooksAction(user?.uid));
    }, [dispatch, user]);

    return (
        <UserLayout>
            <div className='p-2 text-secondary'>
                <h3>History</h3>

                <Container>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User First Name</th>
                                <th>Burrowed Date</th>
                                <th>Return Date</th>
                                <th>Book Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {burrowBooksHistory.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{new Date(item.burrowTime).toLocaleDateString('en-AU')}</td>
                                    <td>{new Date(item.returnDate).toLocaleDateString('en-AU')}</td>
                                    <td>{item.bookName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>

            </div>
        </UserLayout>
    );
};
