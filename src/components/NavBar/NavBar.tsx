import React, { useRef, useState } from 'react';
import './NavBar.scss';
import MMLink from '../MMLink/MMLink';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { MMButton } from '../MMButton/MMButton';
import { FaSearch } from 'react-icons/fa';
import { BiMenu } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';

export const NavBar = () => {
  const { user, handleUserLogout } = useAuth();
  const [sidenavWidth, setSidenavWidth] = useState('0');

  const SearchBar = () => {
    let placeholder = 'Buscar Artistas, Espacios de Eventos y Productoras';

    return (
      <div className="search-bar">
        <i>
          <FaSearch color="black" />
        </i>
        <input placeholder={placeholder}></input>
      </div>
    );
  };

  const NavContent = () => {
    if (user === undefined) {
      return (
        <div className="links-container">
          <MMLink to={'/'} content="Buscar Eventos" />
          <MMLink to={'/'} content="Sobre Nosotros" />
          <MMLink to={'/'} content="Sobre Nosotros" />
          <MMLink to={'/'} content="Sobre Nosotros" />
          <Link to={'/login'}>
            <MMButton style={{ textTransform: 'none' }} color="secondary">
              Iniciar Sesión / Registrarse
            </MMButton>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="links-container">
          <MMLink to={'/BuscarEvento'} content="Buscar Evento" />
          <MMLink to={'/register'} content="Register" />
          <MMLink to={'/change-password'} content="Cambiar Contraseña" />
          <MMLink to={'/recover-password'} content="Recuperar Contraseña" />
        </div>
      );
    }
  };

  const SideNavContent = () => {
    if (user === undefined) {
      return (
        <div className="content">
          <MMLink to={'/'} content="Buscar Eventos" />
          <MMLink to={'/'} content="Sobre Nosotros" />
          <Link to={'/login'}>
            <MMButton style={{ textTransform: 'none' }} color="secondary">
              Iniciar Sesión / Registrarse
            </MMButton>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="">
          <MMLink to={'/BuscarEvento'} content="Buscar Evento" />
          <MMLink to={'/register'} content="Register" />
          <MMLink to={'/change-password'} content="Cambiar Contraseña" />
          <MMLink to={'/recover-password'} content="Recuperar Contraseña" />
          <button onClick={() => handleUserLogout()}> Logout </button>
        </div>
      );
    }
  };

  return (
    <div>
      <div id="mySidenav" className="sidenav" style={{ width: sidenavWidth }}>
        <SideNavContent />
      </div>
      <nav>
        <Link to={'/'} style={{ textDecoration: 'none' }} className="logo-container">
          <img className="logo" alt="music-maniacs-logo" src={require('../../assets/logos/MMlogo.png')} />
          <h1 className="title">MUSIC MANIACS</h1>
        </Link>

        <SearchBar />

        <NavContent />

        <div className="hamburguer">
          {sidenavWidth == '0' ? (
            <BiMenu size={40} onClick={() => setSidenavWidth('40%')} />
          ) : (
            <IoMdClose
              className="close-sidenav"
              size={40}
              onClick={() => {
                setSidenavWidth('0');
              }}
            />
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
