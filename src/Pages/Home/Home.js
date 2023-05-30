import React from 'react'
import { HomeCarousel } from './HomeCarousel'
import { Container } from 'react-bootstrap'

export const Home = () => {
    return (
        <div>
            <HomeCarousel />
            <Container className='text-center'>
                <h1>Hello</h1>
            </Container>
        </div>
    )
}
