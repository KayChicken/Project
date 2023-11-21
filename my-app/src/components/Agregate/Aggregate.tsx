import React from 'react';
import { Link } from 'react-router-dom';

const Aggregate = () => {
    return (
        <div>
            <div className="container">
                <Link to="category">Подсчёт товаров по категории</Link>
            </div>
        </div>
    );
};

export default Aggregate;