import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

const AggregatePrice = () => {


    const [price, setPrice] = useState<number>(0)


    useEffect(() => {
        const response = axios.get("http://localhost:3030/order/api/aggregate/fullprice").then((total: AxiosResponse<number>) => {
            setPrice(total.data)
        })
    }, [])


    return (
        <div>
            <div className="container">
                <h1>Посчёт общей стоимости заказов</h1>
                <div>Итог: {price} руб.</div>
            </div>

        </div>
    );
};

export default AggregatePrice;