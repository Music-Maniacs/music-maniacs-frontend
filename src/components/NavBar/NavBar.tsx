import React, { useState } from 'react';
import './NavBar.scss';
import MMLink from '../MMLink/MMLink';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { MMButton } from '../MMButton/MMButton';
import { BiHelpCircle, BiMenu } from 'react-icons/bi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { SideNav } from './SideNav';
import { NavUserProfile } from './NavUserProfile';
import { MMContainer } from '../MMContainer/MMContainer';
import './NavBar.scss';
import { ToggleThemeIcon } from './ToggleThemeIcon';
import { Loader } from '../Loader/Loader';
import { AdminRoutes } from './components/AdminRoutes';

export const NavBar = () => {
  const { user, handleUserLogout, isUserLoading, navigationPolicies } = useAuth();
  const [sidenavAcive, setSidenavActive] = useState(false);
  const navigate = useNavigate();
  const hasAdminDropdown = navigationPolicies.some((el) => el.includes('Admin'));

  const NavContent = () => {
    if (isUserLoading)
      return (
        <div className="links-container">
          <Loader height={56} width={200} />
        </div>
      );
    if (!user) {
      return (
        <div className="links-container">
          <MMLink to={'/profiles'} content="Buscar Perfiles" />
          <MMLink to={'/events'} content="Buscar Eventos" />
          <MMLink to={'/'} content="Sobre Nosotros" />

          <BiHelpCircle size={20} onClick={() => navigate('help_center')} style={{ cursor: 'pointer' }} />

          <ToggleThemeIcon />

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
        <MMLink to={'/profiles'} content="Buscar Perfiles" />
        <MMLink to={'/events'} content="Buscar Eventos" />
        {navigationPolicies.includes('ReportsController') && <MMLink to={'/moderation'} content="Moderar" />}

        {hasAdminDropdown && (
          <div className="nav-dropdown">
            <div className="nav-admin-container">
              <span>Administrar</span>
              <IoMdArrowDropdown size={20} />
            </div>
            <div className="nav-dropdown-content">
              <AdminRoutes />
            </div>
          </div>
        )}

        <BiHelpCircle size={20} onClick={() => navigate('help_center')} style={{ cursor: 'pointer' }} />

        <ToggleThemeIcon />

        <div className="nav-dropdown">
          <div className="nav-admin-container">
            <NavUserProfile active={false} />
          </div>
          <div className="nav-dropdown-content">
            <MMLink to={'/user/profile'} content="Mi Perfil" />
            <MMLink to={'/'} content="Cerrar Sesión" onClick={() => handleUserLogout()} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <nav>
        <MMContainer maxWidth="xxl" className="nav-container">
          <div className="hamburguer">
            <BiMenu
              size={40}
              onClick={() => setSidenavActive(true)}
              color={sidenavAcive ? '#1e2e2c' : 'var(--text_color)'}
            />
          </div>

          <Link to={'/'} style={{ textDecoration: 'none' }} className="logo-container">
            <img className="logo" alt="music-maniacs-logo" src={require('../../assets/logos/MMlogo.png')} />
            <h1 className="title">MUSIC MANIACS</h1>
          </Link>

          <NavContent />
        </MMContainer>
      </nav>
      <SideNav active={sidenavAcive} setActive={setSidenavActive} />
    </>
  );
};

export default NavBar;
