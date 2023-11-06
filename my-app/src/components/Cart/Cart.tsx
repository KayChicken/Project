import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store';
import { removeItem } from '../../redux/slices/cartSlice';



const Cart = () => {


    const cart = useSelector((state: RootState) => state.cart.cart)
    const price = cart.reduce((sum,item) => sum + item.price * item.count , 0)
    const dispatch = useDispatch()

    return (
        <section className='cart'>
            <div className="container">
                <h1>Корзина:</h1>
                {cart.length > 0 ? 
                <div>
                    {cart.map(item => (
                        <div>
                            <h3>{item.name}</h3>
                            <img src={`${item.img}`} alt="product.png" className='cart-item__img' />
                            <div>{item.price}</div>
                            <div>Количество: {item.count}</div>
                            <button onClick={() => {dispatch(removeItem(item._id))}}>Убрать из корзины</button>
                        </div>
                    ))}
                    <div>Сумма заказа: {price}</div>
                    <button onClick={() => {}}>Заказать</button>
                </div> :
                 "Корзина пустая ☹️"}
            </div>


        </section>
    );
};

export default Cart;