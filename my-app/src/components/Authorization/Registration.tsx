import axios from "axios";
import React, { useState } from "react";

interface IRegistrationProp {
  setChangeAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const Registration: React.FC<IRegistrationProp> = ({ setChangeAuth }) => {
  const [formInit, setFormInit] = useState({
    username: "",
    login: "",
    password: "",
  });

  const registration = async () => {
    const response = await axios.post(
      "https://cjmnzp-3030.csb.app/auth/registration",
      formInit,
    );
  };

  return (
    <>
      <h1>Регистрация</h1>
      <label htmlFor="username">Имя</label>
      <input
        type="text"
        name="username"
        onChange={(e) => {
          setFormInit((prevForm) => ({
            ...prevForm,
            username: e.target.value,
          }));
        }}
      />
      <label htmlFor="login">Логин</label>
      <input
        type="text"
        name="login"
        onChange={(e) =>
          setFormInit((prevForm) => ({
            ...prevForm,
            login: e.target.value,
          }))
        }
        value={formInit.login}
      />
      <label htmlFor="password">Пароль</label>
      <input
        type="text"
        name="password"
        onChange={(e) =>
          setFormInit((prevForm) => ({ ...prevForm, password: e.target.value }))
        }
        value={formInit.password}
      />
      <button
        type="submit"
        onClick={() => {
          registration();
        }}
      >
        Зарегистрироваться
      </button>
      <button
        onClick={() => {
          setChangeAuth(true);
        }}
      >
        Перейти к логину
      </button>
    </>
  );
};

export default Registration;
