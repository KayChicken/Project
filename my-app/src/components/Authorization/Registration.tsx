import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { IUser, setUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IRegistrationProp {
  setChangeAuth: React.Dispatch<React.SetStateAction<boolean>>;
}



const Registration: React.FC<IRegistrationProp> = ({ setChangeAuth }) => {
  const [formInit, setFormInit] = useState({
    username: "",
    login: "",
    password: "",
  });

  const [status, setStatus] = useState<string>('')
  const navigate = useNavigate()
  const registration = async () => {
    const response = await axios.post<IUser>(
      "http://localhost:3030/auth/registration",
      formInit
    ).then((response: AxiosResponse<IUser, any>) => {
      const data: IUser = response.data;
      dispatch(setUser(data));
    });
  };

  const dispatch = useDispatch()


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
