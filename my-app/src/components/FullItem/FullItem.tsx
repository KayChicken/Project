import React, { useEffect, useState } from 'react';
import { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux'
import { addCart } from '../../redux/slices/cartSlice';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IItemsProps } from '../Item/Item';



interface IFullItemSettings {
    "_id": number,
    "name": string,
    "description": string,
    "price": number,
    "brand": string,
    "category" : {
        "category" : string
    },
    "img": string,
    "colors": string[],
    "sizes": string[],
    "material": string,

}




const FullItem = () => {


    const [item, setItem] = useState<IFullItemSettings>()
    const [count, setCount] = useState(1)
    const { id } = useParams()
    const dispatch = useDispatch()

    const [size,setSize] = useState<number>(0)
    const [color,setColor] = useState<number>(0)

    useEffect(() => {
        const fetchData = async () => {
            const response = axios.get(`http://localhost:3030/product/${id}`).then((item) => {
                console.log(item.data)
                setItem(item.data)
            })
        }


        fetchData()
    }, [])




    return (
        <section className='full-item'>
            <div className="container">
                <div>Предмет</div>
                <div>
                    {item ?
                        <div>
                            <h2>{item.name}</h2>
                            <img src={`${item.img}`} alt="item.png" className='full-item__img' />
                            <div>{item.brand}</div>
                            <div>{item.description}</div>
                            <div>{item.price}</div>
                            <div>{item.category.category}</div>
                            <div style={{display:'flex', columnGap:'10px',alignItems:"center"}}>
                                Цвета:
                                {item.colors.map((item,index) => (
                                    <div className={index === color ? 'active' : ''} style={{border:"1px solid black" , padding : "5px 5px", cursor:"pointer"}} onClick={() => setColor(index)}>{item}</div>
                                ))}
                            </div>
                            <div style={{display:'flex',  columnGap:'10px' , alignItems:"center", marginTop:"10px"}}>
                                Размеры:
                                {item.sizes.map((item,index) => (
                                    <div className={index === size ? 'active' : ''} style={{border:"1px solid black" , padding : "5px 10px", cursor:"pointer"}} onClick={() => setSize(index)}>{item}</div>
                                ))}
                            </div>

                            <button style={{marginTop:"10px"}} onClick={() => { dispatch(addCart({ ...item, count, size : item.sizes[size] , color : item.colors[color]})) }}>Добавить в корзину</button>
                        </div> :
                        'Загрузка...'}
                </div>

            </div>
        </section>
    );
};

export default FullItem;