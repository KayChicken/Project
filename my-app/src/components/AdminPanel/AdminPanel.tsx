import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
    return (
        <section className='admin-panel'>
            <div className="container">
                <h1>Админ панель</h1>
                <div>
                    <Link to='/create'>Добавить одежду</Link>
                    <Link to='/delete'>Удалить одежду</Link>
                    <Link to='/edit'>Редактировать одежду</Link>
                </div>
            </div>
        </section>
    );
};

export default AdminPanel;