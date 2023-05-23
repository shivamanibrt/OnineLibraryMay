import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { CustomInput } from '../../Components/MainLayout/CustomInput/CustomInput'
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../Config/firebase-config';
import { useNavigate } from 'react-router-dom';

import { doc, setDoc } from 'firebase/firestore';


export const SignUp = () => {
    const [form, setForm] = useState({});
    const navigate = useNavigate();

    const handelOnChange = e => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        })

    }
    const handelOnSumbit = async (e) => {
        try {
            e.preventDefault();

            const { confirmPassword, password, ...rest } = form;

            if (confirmPassword !== password) {
                toast.error('Password not matched')
                return;
            }
            // Register user by creating a new account
            const pendingUser = createUserWithEmailAndPassword(auth, rest.email, password);

            toast.promise(pendingUser, {
                pending: 'Please wait'
            });
            const { user } = await pendingUser;
            if (user?.uid) {
                // Store additional user data in the Firestore database
                await setDoc(doc(db, 'users', user.uid), rest)
                toast.success('Account created please login now');
                navigate('/signIn');
                return;
            }

        } catch (error) {
            toast.error(error.message)
        }

    }
    const inputs = [
        {
            label: 'First Name',
            name: 'fName',
            type: 'text',
            placeholder: 'Doe',
            required: true
        },
        {
            label: 'Last Name',
            name: 'lName',
            type: 'text',
            placeholder: 'Doe',
            required: true
        },
        {
            label: 'Email',
            name: 'email',
            type: 'email',
            placeholder: 'johnDoe@email.com',
            required: true
        },
        {
            label: 'Password',
            name: 'password',
            type: 'password',
            placeholder: '******',
            required: true
        },
        {
            label: 'Confirm Password',
            name: 'confirmPassword',
            type: 'password',
            placeholder: '******',
            required: true
        },

    ]

    return (
        <Container className='mt-1 mb-2'>
            <Form className='border p-5 shadow-lg rounded m-auto' style={{ width: '450px' }} onSubmit={handelOnSumbit}>
                <h3 className='text-primary fw-bolder mb-3'> Join Library Community</h3>
                <Form.Text>
                    Anyone can create admint or user account for expirement purpose.
                    Once you are registered, you will be redirected to Dashboard automatically.
                </Form.Text>

                <div className='mt-2' >
                    <Form.Group className="mb-3" controlId='formBasicElement'>
                        <Form.Label>Account Type</Form.Label>
                        <Form.Select name='role' onChange={handelOnChange}>
                            <option value=''>Select user</option>
                            <option value='admin'>Admin</option>
                            <option value='user'>User</option>
                        </Form.Select>
                    </Form.Group>
                    {
                        inputs.map((item, i) => (
                            <CustomInput key={i} {...item} onChange={handelOnChange} />
                        ))
                    }
                </div>

                <div className='d-grid'>
                    <Button variant='primary' type='submit'> Login</Button>
                </div>
            </Form>
        </Container>
    )
}
