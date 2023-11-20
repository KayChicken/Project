import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IUser, setUser } from "../../redux/slices/authSlice";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface ILoginProp {
  setChangeAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<ILoginProp> = ({ setChangeAuth }) => {
  const [formInit, setFormInit] = useState({
    login: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post<IUser>(
        "http://localhost:3030/auth/login",
        formInit
      );

      const data: IUser = response.data;
      dispatch(setUser(data));
      navigate('/');
      
    } catch (error) {
      console.error("Error during login:", error);
     
    }
  };

  return (
    <>
      <h1>Авторизация</h1>
      <label htmlFor="login">Логин</label>
      <input
        type="text"
        name="login"
        onChange={(e) =>
          setFormInit((prevForm) => ({ ...prevForm, login: e.target.value }))
        }
        value={formInit.login}
      />
      <label htmlFor="password">Пароль</label>
      <input
        type="text"
        name="password"
        onChange={(e) =>
          setFormInit((prevForm) => ({
            ...prevForm,
            password: e.target.value,
          }))
        }
        value={formInit.password}
      />
      <button type="submit" onClick={login}>
        Войти
      </button>
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
