import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

interface IOrder {
    _id: string;
    user: {
        _id: string;
        username: string;
        login: string;
        password: string;



    };
    fullPrice: number;
    items: {
        item: {
            _id: string;
            name: string;
            description: string;
            price: number;
            sizes: string[];
            colors: string[];
            material: string;
            brand: string;
            img: string;
        };
        size: string;
        color: string;
        quantity: number;
        _id: string;
    }[];


}





const Orders = () => {

    const [orders, setOrders] = useState<IOrder[]>()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:3030/order/get").then((items: AxiosResponse<IOrder[], any>) => {
                console.log(items.data)
                setOrders(items.data)
            }).catch((e) => {
                console.log(e)
            })
        }


        fetchData()
    }, [])



    return (
        <div className='container'>
            {orders ? (
                <>
                    {orders.map((item) => (
                        <div style={{marginTop : "50px"}}>
                            {item.user.username}
                            {item.items.map((order) => (
                                <div>
                                    <img src={order.item.img} style={{width: "60px"}}></img>
                                    <div>Название: {order.item.name}</div>
                                    <div>Бренд: {order.item.brand}</div>
                                    <div>Размер: {order.size}</div>
                                    <div>Количество: {order.quantity}</div>
                                </div>
                            ))}
                            <div>Общая стоимость: {item.fullPrice}</div>
                        </div>
                    ))}
                </>
            ) : <div>Загрузка....</div>}
        </div>
    );
};

export default Orders;