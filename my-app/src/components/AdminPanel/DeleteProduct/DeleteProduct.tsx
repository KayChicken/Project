import React , {useState} from 'react';
import axios from 'axios';

const DeleteProduct = () => {

    const [id,setId] = useState<number>(0)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const number = +event.target.value
        setId(id => number)
    }

    const deleteItem = async () => {
        const response = await axios.delete(`http://localhost:3030/product/delete/${id}`).then((item) => {
            console.log(item)
        }).catch((e) => {
            console.log(e)
        })
    }

    return (

        

        <div>
            <h1>Удалить вещь</h1>
            <label htmlFor="id">ID Предмета</label>
            <input type="number" name="id" value={id} onChange={handleChange}/>
            <button onClick={() => {deleteItem()}}>Удалить</button>
        </div>
    );
};

export default DeleteProduct;