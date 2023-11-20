import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { exitLogin } from "../../redux/slices/authSlice";

const Header = () => {
  const count = useSelector((state: RootState) => state.cart.cart);
  const data = useSelector((state: RootState) => state.auth.data)


  const dispatch = useDispatch()



  return (
    <header className="header">
      <div className="container">
        <div className="header__content flex-row jf-between">
          <div className="shop-logo">SuperShop</div>
          <nav className="header__nav">
            <ul className="flex-row jf-between">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Shop</Link>
              </li>
              <li>
                <Link to="/">About us</Link>
              </li>
              <li>
                <Link to="/">More</Link>
              </li>
            </ul>
          </nav>
          <div className="header__cart flex-row">
            <Link to="/cart">Корзина</Link>
            <div style={{marginLeft:"10px"}} className="header__cart-count">{count.length}</div>
          </div>
          <div>
            {data ?

              (
                <>
                  <h1>{data.username}</h1>
                  <button onClick={() => dispatch(exitLogin())}>Выйти</button>
                </>
              )
              :
              <Link to="/authorization">Авторизация</Link>}
          </div>
          <div className="flex-row">
            <Link to="/admin">Админ-панель</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
