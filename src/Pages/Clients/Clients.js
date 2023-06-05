import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { UserLayout } from '../../Components/Layout/UserLayout';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUserData } from '../Signup-signin/userAction';

export const Clients = () => {
    const { userData } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserData()); // Fetch user data when component mounts
    }, [dispatch]);


    return (
        <>
            <UserLayout>
                <div className='p-2'>
                    <h3>Clients</h3>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((user, index) => (
                                <tr key={user?.id}>
                                    <td>{index + 1}</td>
                                    <td>{user?.fName}</td>
                                    <td>{user?.lName}</td>
                                    <td>{user?.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </UserLayout>
        </>
    );
};
