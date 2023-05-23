import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { CustomInput } from '../../Components/MainLayout/CustomInput/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './userAction';
import { useNavigate } from 'react-router-dom';

export const SignIn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({});
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        user?.uid && navigate('/dashboard')
    })


    const handelOnChange = e => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        })

    }

    const handelOnSumbit = async (e) => {
        e.preventDefault();

        dispatch(loginUser(form))
    }

    const inputs = [

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


    ]
    return (
        <Container className='mt-1 mb-2'>
            <Form className='border p-5 shadow-lg rounded m-auto' style={{ width: '450px' }} onSubmit={handelOnSumbit}>
                <h3 className='text-primary fw-bolder mb-3'> Welcome back</h3>

                <div className='mt-2' >
                    {
                        inputs.map((item, i) => (
                            <CustomInput key={i} {...item} onChange={handelOnChange} />
                        ))
                    }
                </div>

                <div className='d-grid'>
                    <Button variant='primary' type='submit'>Login</Button>
                </div>
            </Form>
        </Container>
    )
}
