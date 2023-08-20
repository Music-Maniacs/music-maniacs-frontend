import { useEffect, useRef, useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { MMButton } from '../MMButton/MMButton';
import MMLink from '../MMLink/MMLink';
import { NavUserProfile } from './NavUserProfile';
import './SideNav.scss';

type Props = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SideNav = ({ active, setActive }: Props) => {
  const { user } = useAuth();
  let sideNavRef = useRef<HTMLDivElement>(null);

  const md_breakpoint = 798;

  useEffect(() => {
    const handler = (e: Event) => {
      if (window.innerWidth < md_breakpoint && e.target instanceof Node && !sideNavRef.current?.contains(e.target)) {
        setActive(false);
      }
    };
    document.addEventListener('mousedown', handler);
    console.log('Sidenav useEffect');
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  const SidenavContent = () => {
    if (!user) {
      return (
        <div className="content">
          <MMLink to={'/'} content="Buscar Eventos" />
          <MMLink to={'/'} content="Sobre Nosotros" />
          <Link to={'/login'} onClick={() => setActive(false)}>
            <MMButton style={{ textTransform: 'none' }} color="secondary">
              Iniciar Sesión / Registrarse
            </MMButton>
          </Link>
        </div>
      );
    }
    return (
      <>
        <UserDropdown />
        <div className="content">
          <MMLink to={'/BuscarEvento'} content="Buscar Evento" />
          <MMLink to={'/'} content="Moderar Contenido" />
          <AdminDropdown />
        </div>
      </>
    );
  };

  return (
    <div id="mySidenav" className={active ? 'sidenav active' : 'sidenav'} ref={sideNavRef}>
      <IoMdClose
        className="close-sidenav"
        size={40}
        onClick={() => {
          setActive(false);
        }}
      />
      <SidenavContent />
    </div>
  );
};

const AdminDropdown = () => {
  const [adminDropdownActive, setAdminDropdownActive] = useState(false);
  return (
    <>
      <div
        className="sidenav-admin-container"
        onClick={() => {
          setAdminDropdownActive(!adminDropdownActive);
        }}
      >
        <span>Administrar Contendino</span>
        {adminDropdownActive ? <IoMdArrowDropup size={20} /> : <IoMdArrowDropdown size={20} />}
      </div>

      <div className={adminDropdownActive ? 'sidenav-admin-dropdown active' : 'sidenav-admin-dropdown'}>
        <MMLink to={'/'} content="Métricas y Reportes" />
        <MMLink to={'/'} content="Usuarios" />
        <MMLink to={'/'} content="Eventos" />
        <MMLink to={'/'} content="Artistas" />
        <MMLink to={'/'} content="Productoras" />
        <MMLink to={'/'} content="Espacios de eventos" />
        <MMLink to={'/'} content="Generos Musicales" />
        <MMLink to={'/'} content="Roles" />
        <MMLink to={'/'} content="Niveles de Confianza" />
        <MMLink to={'/'} content="Copias de Seguridad" />
        <MMLink to={'/'} content="Umbrales Penalizacion" />
      </div>
    </>
  );
};

const UserDropdown = () => {
  const [userDropdownActive, setUserDropdownActive] = useState(false);
  const { handleUserLogout } = useAuth();
  return (
    <div className="user-container">
      <div
        className="user-info"
        onClick={() => {
          setUserDropdownActive(!userDropdownActive);
        }}
      >
        <NavUserProfile active={userDropdownActive} />
      </div>

      <div className={userDropdownActive ? 'sidenav-user-dropdown active' : 'sidenav-user-dropdown'}>
        <MMLink to={'/'} content="Mi Perfil" />
        <MMLink to={'/change-password'} content="Cambiar Contraseña" />
        <MMLink to={'/recover-password'} content="Recuperar Contraseña" />
        <MMLink to={'/login'} onClick={() => handleUserLogout()} content="Cerrar Sesión" />
      </div>
    </div>
  );
};
