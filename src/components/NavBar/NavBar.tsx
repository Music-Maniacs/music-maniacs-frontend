import React, { useState } from 'react';
import './NavBar.scss';
import MMLink from '../MMLink/MMLink';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { MMButton } from '../MMButton/MMButton';
import { FaSearch } from 'react-icons/fa';
import { BiMenu } from 'react-icons/bi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { SideNav } from './SideNav';
import { NavUserProfile } from './NavUserProfile';

export const NavBar = () => {
  const { user, handleUserLogout } = useAuth();
  const [sidenavAcive, setSidenavActive] = useState(false);
  const navigate = useNavigate();

  const NavContent = () => {
    if (!user) {
      return (
        <div className="links-container">
          <MMLink to={'/'} content="Buscar Eventos" />
          <MMLink to={'/'} content="Sobre Nosotros" />
          <MMButton
            style={{ textTransform: 'none' }}
            color="secondary"
            onClick={() => {
              setSidenavActive(false);
              navigate('login');
            }}
          >
            Iniciar Sesión / Registrarse
          </MMButton>
        </div>
      );
    }
    return (
      <div className="links-container">
        <MMLink to={'/BuscarEvento'} content="Buscar Evento" />
        <MMLink to={'/BuscarEvento'} content="Moderar Contenido" />

        <div className="nav-dropdown">
          <div className="nav-admin-container">
            <span>Administrar Contenido</span>
            <IoMdArrowDropdown size={20} />
          </div>
          <div className="nav-dropdown-content">
            <MMLink to={'/'} content="Métricas y Reportes" />
            <MMLink to={'/admin/users'} content="Usuarios" />
            <MMLink to={'/admin/events'} content="Eventos" />
            <MMLink to={'/admin/artists'} content="Artistas" />
            <MMLink to={'/'} content="Productoras" />
            <MMLink to={'/admin/venues'} content="Espacios de eventos" />
            <MMLink to={'/admin/roles'} content="Roles" />
            <MMLink to={'/admin/genres'} content="Generos Musicales" />
            <MMLink to={'/'} content="Niveles de Confianza" />
            <MMLink to={'/'} content="Copias de Seguridad" />
            <MMLink to={'/'} content="Umbrales Penalizacion" />
          </div>
        </div>

        <div className="nav-dropdown">
          <div className="nav-admin-container">
            <NavUserProfile active={false} />
          </div>
          <div className="nav-dropdown-content">
            <MMLink to={'/'} content="Mi Perfil" />
            <MMLink to={'/'} content="Cerrar Sesión" onClick={() => handleUserLogout()} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <nav>
        <div className="hamburguer">
          <BiMenu size={40} onClick={() => setSidenavActive(true)} color={sidenavAcive ? '#1e2e2c' : 'white'} />
        </div>

        <Link to={'/'} style={{ textDecoration: 'none' }} className="logo-container">
          <img className="logo" alt="music-maniacs-logo" src={require('../../assets/logos/MMlogo.png')} />
          <h1 className="title">MUSIC MANIACS</h1>
        </Link>

        <div className="search-bar">
          <i>
            <FaSearch color="black" />
          </i>
          <input placeholder="Buscar Artistas, Espacios de Eventos y Productoras"></input>
        </div>

        <NavContent />
      </nav>
      <SideNav active={sidenavAcive} setActive={setSidenavActive} />
    </div>
  );
};

export default NavBar;
