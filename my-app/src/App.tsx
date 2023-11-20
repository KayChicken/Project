import React, { useEffect } from "react";
import "./scss/global.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";

import FullItem from "./components/FullItem/FullItem";
import { Route, Routes, useNavigate } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import CreateProduct from "./components/AdminPanel/CreateProduct/CreateProduct";
import DeleteProduct from "./components/AdminPanel/DeleteProduct/DeleteProduct";
import EditProduct from "./components/AdminPanel/EditProduct/EditProduct";
import FullEditProduct from "./components/AdminPanel/EditProduct/FullEditProduct";
import Authorization from "./components/Authorization/Authorization";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Orders from "./components/AdminPanel/Orders/Orders";

function App() {

  const auth = useSelector((state : RootState) => state.auth.data)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth]);

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product/:id" element={<FullItem />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/delete" element={<DeleteProduct />} />
          <Route path="/edit" element={<EditProduct />} />
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/edit/:id" element={<FullEditProduct />} />
          <Route path="/authorization" element={<Authorization />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
