import React from 'react';
import './NavBar.scss';
import MMLink from '../MMLink/MMLink';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav>
      <div className='logo-container'>
        {/* <img alt='music-maniacs-logo' /> */}
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <h1 className='title'>MUSIC MANIACS</h1>
        </Link>
      </div>

      <div>
        <span>Buscador</span>
      </div>

      <div className='links-container'>
        <MMLink to={'/login'} content='Login' />
        <MMLink to={'/register'} content='Register' />
      </div>
    </nav>
  );
};

export default NavBar;
