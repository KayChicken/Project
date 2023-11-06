import React, {useEffect, useState} from 'react';
import { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux'
import { addCart } from '../../redux/slices/cartSlice';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IItemsProps } from '../Item/Item';

const FullItem = () => {


    const [item,setItem] = useState<IItemsProps>()
    const [count, setCount] = useState(1)
    const {id} = useParams()
    const dispatch = useDispatch()
    

    useEffect(() => {
        const fetchData = async () => {
            const response = axios.get(`http://localhost:3030/product/${id}`).then((item) => {
                setItem(item.data)
            })
        }


        fetchData()
    } , [])


  

    return (
        <section className='full-item'>
            <div className="container">
                <div>Предмет</div>
                <div>
                    {item ? 
                    <div>
                        <h2>{item.name}</h2>
                        <img src={`${item.img}`} alt="item.png" className='full-item__img'/>
                        <div>{item.brand}</div>
                        <div>{item.price}</div>

                        <button onClick={() => {dispatch(addCart({...item, count}))}}>Добавить в корзину</button>
                    </div> : 
                    'Загрузка...'}
                </div>
                
            </div>
        </section>
    );
};

export default FullItem;