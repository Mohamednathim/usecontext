import React from 'react';
import Home from '../components/Home';
import products from '../data/product';


const HomePage = () => {
    return (
        <div>
            <Home products={products} />
        </div>
    );
};

export default HomePage;
