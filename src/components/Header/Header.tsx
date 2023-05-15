import React from 'react';
import './Header.css';
import HeaderMenu from '../HeaderMenu/HeaderMenu';

const Header: React.FC = () => {


    return (
        <header className='header'>
            <p className='logo'>Remember</p>
            <HeaderMenu />
        </header >
    );
};

export default Header;


