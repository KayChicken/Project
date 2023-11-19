import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export interface IEditItemsProps {
  name: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  material: string;
  brand: string;
  img: string;
}

const FullEditProduct = () => {
  const { id } = useParams();
  const [item, setItem] = useState<IEditItemsProps>();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [inputValue, setInputValue] = useState<IEditItemsProps>({
    name: "",
    description: "",
    price: 0,
    sizes: [],
    colors: [],
    material: "",
    brand: "",
    img: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value,
    }));
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const handleAttributeSizesChange = (size: string) => {
    setInputValue((prev) => ({
      ...prev,
      sizes: [...prev.sizes, size],
    }));
  };

  const handleAttributeColorChange = (color: string) => {
    setInputValue((prev) => ({
      ...prev,
      colors: [...prev.colors, color],
    }));
  };

  const sendData = async () => {
    const data = { ...inputValue };
    console.log(data);
    const response = await axios
      .patch(`https://cjmnzp-3030.csb.app/product/update/${id}`, data)
      .then((item) => {
        console.log(item.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get<IEditItemsProps>(`http://localhost:3030/product/${id}`)
        .then((item) => {
          console.log(item);
          setItem(item.data);
          setInputValue({ ...item.data });
        });
    };
    fetchData();
  }, []);

  return (
    <div style={{ display: "inline-flex", flexDirection: "column" }}>
      <h1>Создать вещь</h1>
      <label htmlFor="name">Название</label>
      <input
        type="text"
        value={inputValue.name}
        onChange={handleChange}
        name="name"
      />
      <label htmlFor="description">Описание</label>
      <input
        type="text"
        value={inputValue.description}
        onChange={handleChange}
        name="description"
      />
      <label htmlFor="price">Цена</label>
      <input
        type="text"
        value={inputValue.price}
        onChange={handleChange}
        name="price"
      />
      <label htmlFor="sizes">Размеры</label>
      <div>
        Добавленные Размеры:
        {inputValue.sizes.length > 0
          ? inputValue.sizes.map((item) => <div>{item}</div>)
          : "Размеры не добавлены"}
      </div>
      <input
        type="text"
        value={size}
        onChange={handleSizeChange}
        name="sizes"
      />
      <button onClick={() => handleAttributeSizesChange(size)}>
        Добавить размер
      </button>
      <label htmlFor="colors">Цвета</label>
      <div>
        Добавленные цвета:
        {inputValue.colors.length > 0
          ? inputValue.colors.map((item) => <div>{item}</div>)
          : "Цвета не добавлены"}
      </div>
      <input
        type="text"
        value={color}
        onChange={handleColorChange}
        name="colors"
      />
      <button onClick={() => handleAttributeColorChange(color)}>
        Добавить цвет
      </button>
      <label htmlFor="material">Материал</label>
      <input
        type="text"
        value={inputValue.material}
        onChange={handleChange}
        name="material"
      />
      <label htmlFor="brand">Бренд</label>
      <input
        type="text"
        value={inputValue.brand}
        onChange={handleChange}
        name="brand"
      />
      <label htmlFor="img">Изображение</label>
      <input
        type="text"
        value={inputValue.img}
        onChange={handleChange}
        name="img"
      />
      <button
        onClick={() => {
          sendData();
        }}
      >
        Изменить товар
      </button>
    </div>
  );
};

export default FullEditProduct;
