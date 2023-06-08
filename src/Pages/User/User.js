import React, { useEffect } from 'react';
import { UserLayout } from '../../Components/Layout/UserLayout';
import { Table, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserAction, deleteUserAction } from '../Signup-signin/userAction';
import { AiFillDelete } from 'react-icons/ai';


export const User = () => {
    const { allUser } = useSelector((state) => state.user);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUserAction(user?.uid));
    }, [dispatch, user]);



    const handleOnDelete = (userId) => {
        dispatch(deleteUserAction(userId));
    };


    return (
        <>
            <UserLayout>
                <div className="p-2 text-secondary">
                    <h3>Current Users</h3>
                </div>

                <Container>
                    <Table striped bordered hover responsive className='custom-table'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Role</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {allUser.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.role}</td>
                                    <td>{item.fName}</td>
                                    <td>{item.lName}</td>
                                    <td style={{ overflow: 'scroll' }} >{item.email}</td>
                                    <td>
                                        <Button variant='danger' onClick={() => handleOnDelete(item.id)}>
                                            <AiFillDelete />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>


            </UserLayout >
        </>
    );
};
