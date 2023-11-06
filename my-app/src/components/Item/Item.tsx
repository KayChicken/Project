import React from 'react';


export interface IItemsProps {
    "_id": number,
    "name": string,
    "price": number,
    "brand": string,
    "img": string
}


const Item: React.FC<IItemsProps> = ({ name, brand, img,price }) => {
    return (
        <div className='item'>
            <img src={img} alt="item.png" className='item__img'/>
            <h3>{name}</h3>
            <div>{brand}</div>
            <div>{price}</div>
        </div>
    );
};

export default Item;