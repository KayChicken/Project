import React, { useState, useEffect } from "react";
import axios from "axios";

export interface ICreateItemsProps {
  name: string;
  description: string;
  category: string,
  price: number;
  sizes: string[];
  colors: string[];
  material: string;
  brand: string;
  img: string;
}

const CreateProduct = () => {
  const [inputValue, setInputValue] = useState<ICreateItemsProps>({
    name: "Штаны",
    description: "Топ",
    category: '',
    price: 100,
    sizes: ["XLL", "L"],
    colors: ["Красный", "Зеленый"],
    material: "Шёлк 100%",
    brand: "Abibas",
    img: "https://img.brandshop.ru/cache/products/n/np0a4h71-fc1-0_1104x1104.jpg",
  });

  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [categories, setCategories] = useState<{ _id: string, category: string }[]>([])


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
    console.log(data)
    const response = await axios
      .post("http://localhost:3030/product/create", data)
      .then((item) => {
      })
      .catch((e) => {
        console.log(e);
      });
  };



  useEffect(() => {
    const fetchInfo = async () => {
      const response = await axios.get("http://localhost:3030/product/api/info").then((data) => {
        console.log(data.data)
        setCategories(data.data)
      })
    }
    fetchInfo()
  }, [])

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
      <label htmlFor="category">Категория</label>
      <select
        value={inputValue.category}
        onChange={(e) => setInputValue((prevForm) => ({ ...prevForm, category: e.target.value }))}
      >
        <option value="">Выберите категорию</option>
        {categories.length > 0 && categories.map((category) => (
          <option key={category._id} value={category._id}>{category.category}</option>
        ))}
      </select>
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
        Добавить товар
      </button>
    </div>
  );
};

export default CreateProduct;
