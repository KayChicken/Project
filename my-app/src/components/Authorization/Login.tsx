import React, { useState } from "react";

interface ILoginProp {
  setChangeAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<ILoginProp> = ({ setChangeAuth }) => {
  const [formInit, setFormInit] = useState({
    login: "",
    password: "",
  });

  return (
    <>
      <h1>Авторизация</h1>
      <label htmlFor="login">Логин</label>
      <input type="text" name="login" />
      <label htmlFor="password">Пароль</label>
      <input type="text" name="password" />
      <button type="submit">Войти</button>
      <button
        onClick={() => {
          setChangeAuth(false);
        }}
      >
        Зарегистрироваться
      </button>
    </>
  );
};

export default Login;
