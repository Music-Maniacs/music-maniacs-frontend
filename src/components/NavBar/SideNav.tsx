import { useEffect, useRef, useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import breakpoints from '../../styles/_breakpoints.scss';
import { MMButton } from '../MMButton/MMButton';
import MMLink from '../MMLink/MMLink';
import { NavUserProfile } from './NavUserProfile';
import './SideNav.scss';
import { ToggleThemeIcon } from './ToggleThemeIcon';
import { StyledFlex } from '../../styles/styledComponents';

type Props = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SideNav = ({ active, setActive }: Props) => {
  const { user } = useAuth();
  let sideNavRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const md_breakpoint: number = +breakpoints.md.split('px')[0];

  useEffect(() => {
    const handler = (e: Event) => {
      if (window.innerWidth < md_breakpoint && e.target instanceof Node && !sideNavRef.current?.contains(e.target)) {
        setActive(false);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SidenavContent = () => {
    if (!user) {
      return (
        <div className="content">
          <MMLink to={'/profiles'} content="Buscar Perfiles" />
          <MMLink to={'/events'} content="Buscar Eventos" />
          <MMLink to={'/'} content="Sobre Nosotros" />
          <MMButton
            style={{ textTransform: 'none' }}
            color="secondary"
            onClick={() => {
              setActive(false);
              navigate('/login');
            }}
          >
            Iniciar Sesión / Registrarse
          </MMButton>
        </div>
      );
    }
    return (
      <>
        <UserDropdown />
        <div className="content">
          <MMLink to={'/profiles'} content="Buscar Perfiles" />
          <MMLink to={'/events'} content="Buscar Eventos" />
          <MMLink to={'/'} content="Moderar" />
          <AdminDropdown />
        </div>
      </>
    );
  };

  return (
    <div id="mySidenav" className={active ? 'sidenav active' : 'sidenav'} ref={sideNavRef}>
      <StyledFlex $justifyContent="space-between" $alignItems="center">
        <IoMdClose
          className="close-sidenav"
          size={40}
          onClick={() => {
            setActive(false);
          }}
        />

        <div style={{ padding: '10px' }}>
          <ToggleThemeIcon />
        </div>
      </StyledFlex>
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
        <span>Administrar</span>
        {adminDropdownActive ? <IoMdArrowDropup size={20} /> : <IoMdArrowDropdown size={20} />}
      </div>

      <div className={adminDropdownActive ? 'sidenav-admin-dropdown active' : 'sidenav-admin-dropdown'}>
        <MMLink to={'/'} content="Métricas y Reportes" />
        <MMLink to={'/admin/users'} content="Usuarios" />
        <MMLink to={'/admin/events'} content="Eventos" />
        <MMLink to={'/admin/artists'} content="Artistas" />
        <MMLink to={'/'} content="Productoras" />
        <MMLink to={'/admin/venues'} content="Espacios de eventos" />
        <MMLink to={'/admin/roles'} content="Roles" />
        <MMLink to={'/admin/genres'} content="Generos Musicales" />
        <MMLink to={'/admin/trust_levels'} content="Niveles de Confianza" />
        <MMLink to={'/admin/backups'} content="Copias de Seguridad" />
        <MMLink to={'/admin/thresholds'} content="Umbrales Penalizacion" />
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
        <MMLink to={'/user/profile'} content="Mi Perfil" />
        <MMLink to={'/change-password'} content="Cambiar Contraseña" />
        <MMLink to={'/recover-password'} content="Recuperar Contraseña" />
        <MMLink to={'/login'} onClick={() => handleUserLogout()} content="Cerrar Sesión" />
      </div>
    </div>
  );
};
