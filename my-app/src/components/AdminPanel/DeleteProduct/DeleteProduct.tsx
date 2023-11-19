import React, { useEffect, useState } from "react";
import axios from "axios";
import Item, { IItemsProps } from "../../Item/Item";
import { Link } from "react-router-dom";

const DeleteProduct = () => {
  const [items, setItems] = useState<IItemsProps[]>();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [chooseId, setChooseId] = useState<number>(-1);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get<IItemsProps[]>("http://localhost:3030/product")
        .then((data) => {
          setItems(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchData();
  }, [chooseId]);

  const deleteModuleWindow = (id: number) => {
    setIsShow(!isShow);
    setChooseId(id);
  };

  const confirmDelete = async (agree: string) => {
    if (agree === "yes") {
      await axios.delete(
        `https://cjmnzp-3030.csb.app/product/delete/${chooseId}`,
      );
      setIsShow(!isShow);
      setChooseId(-1);
    } else {
      setChooseId(-1);
      setIsShow(!isShow);
    }
  };

  return (
    <div>
      <h1>Удалить вещь</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,calc(100%/5))",
          columnGap: "15px",
        }}
      >
        {items
          ? items.map((item) => (
              <div
                onClick={() => deleteModuleWindow(item._id)}
                style={{ cursor: "pointer" }}
              >
                <h3>{item.name}</h3>
                <img
                  src={`${item.img}`}
                  alt="item.png"
                  style={{ width: "100px" }}
                />
              </div>
            ))
          : "Загрузка..."}
      </div>
      {isShow && (
        <div
          className="module-window-delete"
          style={{
            position: "absolute",
            width: "400px",
            height: "200px",
            backgroundColor: "#777",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <h1>Вы уверены что хотите удалить товар?</h1>
          <div style={{ display: "flex", columnGap: "15px" }}>
            <div
              className="delete-agree"
              onClick={() => confirmDelete("yes")}
              style={{ cursor: "pointer" }}
            >
              Да
            </div>
            <div
              className="delete-refuse"
              onClick={() => confirmDelete("no")}
              style={{ cursor: "pointer" }}
            >
              Нет
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteProduct;
