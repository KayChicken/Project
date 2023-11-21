import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export interface IEditItemsProps {
  _id: number;
  name: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  material: string;
  brand: string;
  img: string;
}

const EditProduct = () => {
  const [products, setProducts] = useState<IEditItemsProps[]>();
  const [inputValue, setInputValue] = useState<IEditItemsProps>({
    _id: 0,
    name: "Штаны",
    description: "Топ",
    price: 100,
    sizes: ["XLL", "L"],
    colors: ["Красный", "Зеленый"],
    material: "Шёлк 100%",
    brand: "Abibas",
    img: "https://img.brandshop.ru/cache/products/n/np0a4h71-fc1-0_1104x1104.jpg",
  });

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get<IEditItemsProps[]>("http://localhost:3030/product/get")
        .then((response) => {
          setProducts(response.data);
        });
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Редактировать продукт</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,calc(100% / 5))",
          rowGap:"40px"
        }}
      >
        {products
          ? products.map((item) => (
              <Link to={`http://localhost:3000/edit/${item._id}`}>
                <h3>{item.name}</h3>
                <img
                  src={`${item.img}`}
                  alt="item.png"
                  style={{ width: "150px" }}
                />
              </Link>
            ))
          : "Загрузка..."}
      </div>
    </div>
  );
};

export default EditProduct;
