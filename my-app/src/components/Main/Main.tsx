import React, { useState,useEffect } from 'react';
import Item, { IItemsProps } from '../Item/Item';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Main = () => {


    const [data,setData] = useState<IItemsProps[]>([])


    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get("http://localhost:3030/product").then((item) => {
                setData(item.data)
            })
        }


        fetchData()
    }, [])
    




    return (
        <section className='main'>
            <div className="container">
                <div className='products__container'>
                    {data.length > 0 ? data.map((item) => (
                        <Link to={`/product/${item._id}`} >
                            <Item key={item.img} _id={item._id} name={item.name} img={item.img} brand={item.brand} price={item.price} />
                        </Link>
                    )) : <>Загрузка...</>}
                </div>

            </div>

        </section>
    );
};

export default Main;