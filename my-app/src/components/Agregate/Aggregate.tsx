import React from 'react';
import { Link } from 'react-router-dom';

const Aggregate = () => {
    return (
        <div>
            <div className="container">
                <div style={{display:"flex" , flexDirection:"column", rowGap:"10px"}}>
                    <Link to="category">Подсчёт товаров по категории</Link>
                    <Link to="price">Подсчёт общей суммы заказов</Link>
                </div>

            </div>
        </div>
    );
};

export default Aggregate;