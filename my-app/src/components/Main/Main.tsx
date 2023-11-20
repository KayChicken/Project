import React, { useState, useEffect } from 'react';
import Item, { IItemsProps } from '../Item/Item';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Main = () => {


    const [data, setData] = useState<IItemsProps[]>([])
    const [categories, setCategories] = useState<{ _id: string, category: string }[]>([]);
    const [chooseCategory, setChooseCategory] = useState<number>(0)



    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post("http://localhost:3030/product", {"category" : categories.length > 0 ? categories[chooseCategory] : null}).then((item) => {
                setData(item.data)
            })
        }
        fetchData()
    }, [chooseCategory])



    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get("http://localhost:3030/product/api/info").then((item) => {
                console.log(item.data);
                setCategories((prevCat) => ([
                    { _id: null, category: "Все" },
                    ...item.data
                ]));
            });
        };



        fetchCategories()
    }, [])







    return (
        <section className='main'>
            <div className="container">
                <div>
                    <select
                        value={categories[chooseCategory]?._id || ''}
                        onChange={(e) => {
                            const selectedCategoryIndex = categories.findIndex(
                                (category) => category._id === e.target.value
                            );
                            setChooseCategory(selectedCategoryIndex);
                        }}
                    >
                        {categories.length > 0 && categories.map((category) => (
                            <option key={category._id} value={category._id}>{category.category}</option>
                        ))}
                    </select>
                </div>
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