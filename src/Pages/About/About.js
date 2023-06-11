import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import aboutImg from '../../Asset/aboutImg.jpg'

import handWritingImg from '../../Asset/handWritingImg.jpg'
import EImg from '../../Asset/EImg.jpg'
import joinUsImg from '../../Asset/joinUs.jpg'
import { useNavigate } from 'react-router-dom'

export const About = () => {
    const navigate = useNavigate();
    const handelOnSubmit = (e) => {
        navigate('/signUp')

    }
    return (
        <>
            <img src={aboutImg} alt='booksImage' className='aboutImage' />
            <Row>
                <Container>
                    <h5 className='mt-5 p-5 text-center'>
                        Welcome to SLibrary, your sanctuary for knowledge, inspiration, and community. Discover our curated collection of books, where learning thrives and personal growth blossoms. Immerse yourself in tranquil reading spaces, engage in lively discussions, and forge connections with like-minded individuals. With cutting-edge technology, our digital library is accessible anytime, anywhere. Join us at SLibrary, where every page holds transformative power.
                    </h5>
                </Container>
            </Row>
            <Container className='mt-3 mb-3'>
                <div className='p-3 shadow-lg'>
                    <h2 className='text-center mb-4'>Our Mission</h2>
                    <Row className="align-items-center">
                        <Col xs={12} md={6} lg={4}>
                            <img src={joinUsImg} className="d-block w-100" alt='booksImage' style={{ width: '200px' }} />
                        </Col>
                        <Col xs={12} md={6} lg={8} className='d-flex align-items-center mt-3'>
                            <p className='fs-5 lh-lg'>Unlocking the transformative power of literature, we empower minds and ignite inspiration. Join us on a transformative journey of knowledge, growth, and shared experiences.</p>
                        </Col>
                    </Row>
                </div>
            </Container>


            <Container className='mt-3 mb-3'>
                <div className='p-3 shadow-lg'>
                    <h2 className='text-center mb-4'>Our Vision</h2>
                    <Row className="align-items-center">

                        <Col xs={12} md={6} lg={8} className='d-flex align-items-center mt-3'>
                            <p className='fs-5 lh-lg'>Unlocking the transformative power of literature, we empower minds and ignite inspiration. Join us on a transformative journey of knowledge, growth, and shared experiences.</p>
                        </Col>
                        <Col xs={12} md={6} lg={4}>
                            <img src={handWritingImg} className="d-block w-100" alt='booksImage' style={{ width: '200px' }} />
                        </Col>
                    </Row>
                </div>
            </Container>
            <Container className='mt-3 mb-3'>
                <div className='p-3 shadow-lg'>
                    <h2 className='text-center mb-4'>Join Us</h2>
                    <Row className="align-items-center">
                        <Col xs={12} md={6} lg={4}>
                            <img src={EImg} className="d-block w-100" alt='booksImage' style={{ width: '200px' }} />
                        </Col>
                        <Col xs={12} md={6} lg={8} className='d-flex align-items-center mt-3'>
                            <p className='fs-5 lh-lg'>Become a part of our vibrant community and embark on a journey of exploration, learning, and growth. Join us at SLibrary and unlock a world of knowledge, inspiration, and connections. Together, let's create a shared space where minds thrive and ideas flourish.
                                <div className="text-center mt-3">
                                    <Button variant="outline-primary"
                                        className="col-4" onClick={handelOnSubmit}>Join Us</Button>
                                </div>
                            </p>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    )
}
