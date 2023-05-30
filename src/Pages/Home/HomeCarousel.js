import React, { useState } from 'react';

import Carousel from 'react-bootstrap/Carousel';

import firstImg from '../../Asset/firstImg.jpg';
import secondImg from '../../Asset/secondImg.jpg';
import thirdImg from '../../Asset/thirdImg.jpg';

export const HomeCarousel = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div>
            <Carousel activeIndex={index} onSelect={handleSelect} className="bg-dark carousel mb-2 text-light">
                <Carousel.Item className="text-light">
                    <img className="d-block w-100 carousel-image dark-overlay" src={firstImg} alt="First slide" />
                    <Carousel.Caption className="caption-bg">
                        <h3 className="caption-text">Welcome to the Library Home! Explore our collection of books, magazines, and resources. Start your literary journey today!</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100 carousel-image dark-overlay" src={secondImg} alt="Second slide" />
                    <Carousel.Caption className="caption-bg">
                        <h3 className="caption-text">Discover our inclusive programs and events. Join our vibrant community of knowledge seekers. Embrace lifelong learning at the Library!</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100 carousel-image dark-overlay" src={thirdImg} alt="Third slide" />
                    <Carousel.Caption className="caption-bg">
                        <h3 className="caption-text">Access e-books and research databases anytime, anywhere. Expand your skills and indulge in captivating digital content with our online resources.</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

        </div>
    );
};
