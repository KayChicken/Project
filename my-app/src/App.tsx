import React from 'react';
import './scss/global.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';

import FullItem from './components/FullItem/FullItem';
import { Route, Routes } from 'react-router-dom';
import Cart from './components/Cart/Cart';
import AdminPanel from './components/AdminPanel/AdminPanel';
import CreateProduct from './components/AdminPanel/CreateProduct/CreateProduct';
import DeleteProduct from './components/AdminPanel/DeleteProduct/DeleteProduct';
import EditProduct from './components/AdminPanel/EditProduct/EditProduct';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/product/:id' element={<FullItem />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/admin' element={<AdminPanel />}/>
          <Route path='/create' element={<CreateProduct />}/>
          <Route path='/delete' element={<DeleteProduct />}/>
          <Route path='/edit' element={< EditProduct/>}/>
          
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
