import React, { useEffect, useState } from 'react';
import { UserLayout } from '../../Components/Layout/UserLayout';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CustomInput } from '../../Components/CustomInput/CustomInput';
import { updateProfileAction } from '../Signup-signin/userAction';

export const Profile = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({});
    const { user } = useSelector(state => state.user);

    useEffect(() => {
        setForm(user);
    }, [user]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleOnSubmit = e => {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to update your profile?")) return;
        const { email, uid, ...rest } = form;
        const obj = { id: uid, ...rest };
        dispatch(updateProfileAction(obj));
    };

    const handelOnPasswordReset = e => {
        e.preventDefault();
    };

    const inputs = [
        {
            label: "Your current role",
            name: "role",
            type: "text",
            value: form.role || "",
            required: true,
            disabled: true,
        },
        {
            label: 'First Name',
            name: 'fName',
            type: 'text',
            placeholder: 'Doe',
            required: true,
            value: form.fName || '',
        },
        {
            label: 'Last Name',
            name: 'lName',
            type: 'text',
            placeholder: 'Doe',
            required: true,
            value: form.lName || '',
        },
        {
            label: 'Email',
            name: 'email',
            type: 'email',
            placeholder: 'johnDoe@email.com',
            required: true,
            value: form.email || '',
            disabled: true,
        },
    ];

    return (
        <>
            <UserLayout>
                <div className='p-2 text-center'>
                    <h3>Profile</h3>
                    <hr />
                    <Container className='mt-2 mb-5'>
                        <Form className='border p-5 shadow-lg rounded m-auto' style={{ width: '80%' }} onSubmit={handleOnSubmit}>
                            {inputs.map((item, i) => (
                                <CustomInput key={i} {...item} onChange={handleOnChange} />
                            ))}
                            <Row className="gap-1">
                                <Col md={7} xs={12} className="mb-2 mb-md-0">
                                    <Button variant="warning" type="submit" className="w-100">
                                        Update Profile!
                                    </Button>
                                </Col>
                                <Col md={4} xs={12}>
                                    <div className="d-grid">
                                        <Button variant="danger" onClick={handelOnPasswordReset} className="w-100">
                                            Reset password & email
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </div>
            </UserLayout>
        </>
    );
};
