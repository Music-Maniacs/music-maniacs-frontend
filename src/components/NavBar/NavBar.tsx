import React, { useEffect, useRef, useState } from 'react';
import './NavBar.scss';
import MMLink from '../MMLink/MMLink';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { MMButton } from '../MMButton/MMButton';
import { FaSearch } from 'react-icons/fa';
import { BiMenu } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { PiUserCircleFill } from 'react-icons/pi';

export const NavBar = () => {
  const { user, handleUserLogout } = useAuth();
  const [sidenavAcive, setSidenavActive] = useState(false);

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
          <div className="user-profile">
            <PiUserCircleFill size={40} />
            <div className="name">
              <MMLink to={'/'} content={user.username} />
              <span>Rol</span>
            </div>
          </div>
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
        <div className="content">
          <MMLink to={'/BuscarEvento'} content="Buscar Evento" />
          <MMLink to={'/register'} content="Register" />
          <MMLink to={'/change-password'} content="Cambiar Contraseña" />
          <MMLink to={'/recover-password'} content="Recuperar Contraseña" />
          <div className="user-profile">
            <PiUserCircleFill size={40} />
            <div className="name">
              <MMLink to={'/'} content={user.username} />
              <span>Rol</span>
            </div>
          </div>
          <MMButton style={{ textTransform: 'none' }} color="secondary" onClick={() => handleUserLogout()}>
            Cerrar Sesión
          </MMButton>
        </div>
      );
    }
  };

  return (
    <div>
      <nav>
        <div className="hamburguer">
          <BiMenu size={40} onClick={() => setSidenavActive(true)} />
        </div>

        <Link to={'/'} style={{ textDecoration: 'none' }} className="logo-container">
          <img className="logo" alt="music-maniacs-logo" src={require('../../assets/logos/MMlogo.png')} />
          <h1 className="title">MUSIC MANIACS</h1>
        </Link>

        <div className="search-bar-container">
          <SearchBar />
        </div>

        <NavContent />
      </nav>
      <div id="mySidenav" className={sidenavAcive ? 'sidenav active' : 'sidenav'}>
        <IoMdClose
          className="close-sidenav"
          size={40}
          onClick={() => {
            setSidenavActive(false);
          }}
        />
        <SideNavContent />
      </div>
    </div>
  );
};

export default NavBar;
