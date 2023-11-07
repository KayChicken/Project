import React, { useState } from "react";

const Login = () => {
  const [formInit, setFormInit] = useState({
    username: "",
    password: "",
  });

  return (
    <>
      <h1>Авторизация</h1>
      <label htmlFor="username">Логин</label>
      <input type="text" name="username" />
      <label htmlFor="password">Пароль</label>
      <input type="text" name="password" />
      <button type="submit">Логин</button>
    </>
  );
};

export default Login;
