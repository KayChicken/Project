import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";

const Header = () => {
  const count = useSelector((state: RootState) => state.cart.cart);

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
            <div className="header__cart-count">{count.length}</div>
          </div>
          <div>
            <Link to="/authorization">Авторизация</Link>
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
