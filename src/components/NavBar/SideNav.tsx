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
import { AdminRoutes } from './components/AdminRoutes';
import { BiHelpCircle } from 'react-icons/bi';

type Props = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SideNav = ({ active, setActive }: Props) => {
  const { user, navigationPolicies } = useAuth();
  let sideNavRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const hasAdminDropdown = navigationPolicies.some((el) => el.includes('Admin'));

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

          {navigationPolicies.includes('ReportsController') && <MMLink to={'/moderation'} content="Moderar" />}

          {hasAdminDropdown && <AdminDropdown />}
        </div>
      </>
    );
  };

  return (
    <div id="mySidenav" className={active ? 'sidenav active' : 'sidenav'} ref={sideNavRef}>
      <StyledFlex $justifyContent="space-between" $alignItems="center" $overflowX='hidden'>
        <IoMdClose
          className="close-sidenav"
          size={40}
          onClick={() => {
            setActive(false);
          }}
        />

        <div style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <BiHelpCircle size={20} onClick={() => navigate('help_center')} style={{ cursor: 'pointer' }} />
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
        <AdminRoutes />
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
