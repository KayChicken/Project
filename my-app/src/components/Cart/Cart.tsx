import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store';
import { removeItem } from '../../redux/slices/cartSlice';
import axios from 'axios';



const Cart = () => {

    const userID = useSelector((state: RootState) => state.auth.data?._id)
    const cart = useSelector((state: RootState) => state.cart.cart)
    const price = cart.reduce((sum, item) => sum + item.price * item.count, 0)
    const dispatch = useDispatch()




    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    // fullPrice: {
    //     type: Number,
    //     required: true
    // },
    // items: [{
    //     item: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Item',
    //         required: true
    //     },
    //     size : {
    //         type : String,
    //         required : true
    //     },
    //     color : {
    //         type : String,
    //         required : true
    //     },
    //     quantity: {
    //         type: Number,
    //         required: true
    //     }
    // }]


    const createOrder = async () => {
        try {
            if (!userID) {
                return alert("Вы не авторизованы")
            }
            const order = {
                "user" : userID,
                "fullPrice" : price,
                "items" : cart.map((item) => ({
                    "item" : item._id,
                    "size" : item.size,
                    "color" : item.color,
                    "quantity" : item.count
                }))
            }
            const response = await axios.post("http://localhost:3030/order/create", order).then((result) => {
                
            })
            console.log("OK")
        }

        catch(e) {
            console.log(e)
        }
       
    }


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
                                <div>Размер : {item.size}</div>
                                <div>Цвет : {item.color}</div>
                                <div>{item.price}</div>
                                <div>Количество: {item.count}</div>
                                <button onClick={() => { dispatch(removeItem(item._id)) }}>Убрать из корзины</button>
                            </div>
                        ))}
                        <div>Сумма заказа: {price}</div>
                        <button onClick={() => createOrder()}>Заказать</button>
                    </div> :
                    "Корзина пустая ☹️"}
            </div>


        </section>
    );
};

export default Cart;