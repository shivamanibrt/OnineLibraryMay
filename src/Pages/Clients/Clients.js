import React from 'react';
import Table from 'react-bootstrap/Table';


import { UserLayout } from '../../Components/Layout/UserLayout';

export const Clients = () => {


    return (
        <>
            <UserLayout>
                <div className='p-2 text-center'>
                    <h3>
                        Clients
                    </h3>
                    <hr />
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
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                        </tbody>
                    </Table>

                </div>

            </UserLayout>
        </>
    );
};
