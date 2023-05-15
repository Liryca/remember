/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './HeaderMenu.css';
import { useState, useContext } from 'react';
import { Hamburger } from '../Hamburger/Hamburger';
import { Link } from 'react-router-dom';
import { AppContext } from "../../index";
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import cross from '../Hamburger/images/cross.svg';
import stars from '../Hamburger/images/stars.svg';

const HeaderMenu: React.FC = () => {

    const [open, setOpen] = useState(false);
    const context = useContext(AppContext);
    const [user] = useAuthState(context?.auth);
    const close = () => setOpen(false);

    return (
        <>
            <Hamburger open={open} setOpen={setOpen} />
            <div className={!open ? 'nav-bar' : 'nav-bar hidden'}>
           
                <nav className='menu__body'>
                <img onClick={() => close()} src={cross} alt='menu' />
                    <ul>
                        <li onClick={() => close()}>{!user ? <Login /> : <Logout />}</li>
                        <li> <Link onClick={() => close()} to={'/'}>Home</Link></li>
                        {user &&
                            <>
                                <li> <Link onClick={() => close()} to={'/addingWord'}>Add Word</Link> </li>
                                <li> <Link onClick={() => close()} to={'/learnWords'}>Learn Words</Link></li>
                                <li> <Link onClick={() => close()} to={'./repeatWords'}>Repeat Words</Link></li>
                            </>
                        }
                    </ul >
                      <img src={stars} alt='stars' />
                </nav>
            </div>
        </>


    );
};

export default HeaderMenu;



