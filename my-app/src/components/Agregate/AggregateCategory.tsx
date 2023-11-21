import axios from 'axios';
import React, { useState, useEffect } from 'react';

const AggregateCategory = () => {

    const [categories, setCategories] = useState<{ _id: string, category: string }[]>([]);
    const [chooseCategory, setChooseCategory] = useState<number>(0)
    const [data,setData] = useState<{_id : null, total : number}>()



    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get("http://localhost:3030/product/api/info").then((item) => {
                setCategories((prevCat) => ([
                    { _id: null, category: "Не выбрано" },
                    ...item.data
                ]));
            });
        };



        fetchCategories()
    }, [])


    useEffect(() => {
        const fetchData = async () => {
      
            if (categories[chooseCategory]) {
                
                const response = await axios.get(`http://localhost:3030/product/api/aggregate?cat=${categories[chooseCategory].category}`).then((data) => {
                    console.log(categories)
                    setData(data.data[0])
                });
            }
        }
    
        fetchData();
    
    }, [chooseCategory]);



    return (

        <div>
            <div className="container">
                <h1>Подсчёт товаров по категории</h1>
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
                <div>
                    Количество товаров : {data?.total}
                </div>
            </div>

        </div>
    );
};

export default AggregateCategory;