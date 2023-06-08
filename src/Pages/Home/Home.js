import React from 'react';
import { HomeCarousel } from './HomeCarousel';
import { BooksList } from '../Book/BooksList';

export const Home = () => {


    return (
        <div>
            <HomeCarousel />
            <BooksList />
        </div>
    );
};