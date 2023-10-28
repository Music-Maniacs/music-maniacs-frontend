import { FaEdit, FaStar, FaTrash, FaUser } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { styled } from 'styled-components';
import { MMBox } from '../../components/MMBox/MMBox';
import { MMContainer } from '../../components/MMContainer/MMContainer';
import { MMTitle } from '../../components/MMTitle/MMTitle';
import { MMNavTabProps, MMVerticalNav } from '../../components/MMVerticalNav/MMVerticalNav';
import colors from '../../styles/_colors.scss';
import './index.scss';
import { Profile } from './pages/profile/Profile';
import { EditProfile } from './pages/edit/EditProfile';
import { useUser } from './context/userContext';
import { Loader } from '../../components/Loader/Loader';
import breakpoints from '../../styles/_breakpoints.scss';
import { useUserProfileRequest } from './hooks/useUserProfileRequest';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { ChangePasswordUserProfile } from './pages/password/ChangePasswordUserProfile';
import { UserFollows } from './pages/follows/UserFollows';

const UserProfileDeleteUser = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  align-self: stretch;
  border-radius: 10px;
  background: none;
  border: none;
  color: ${colors.error};
  cursor: pointer;

  &:hover {
    color: ${colors.error_dark};
  }

  @media screen and (max-width: ${breakpoints.md}) {
    align-self: center;
    span {
      display: none;
    }
  }
`;
export const UserProfile = () => {
  const { userProfile } = useUser();
  const { handleDeleteUserProfile } = useUserProfileRequest();
  const { handleUserLogout } = useAuth();
  const navigate = useNavigate();
  const tabs: MMNavTabProps[] = [
    {
      href: '#profile',
      label: 'Perfil',
      Icon: FaUser,
      id: 'user_profile_tab'
    },
    {
      href: '#follows',
      label: 'Gestionar Seguimientos',
      Icon: FaStar
    },
    {
      href: '#password',
      label: 'Cambiar Contraseña',
      Icon: FaGear
    },
    {
      href: '#edit',
      label: 'Editar Perfil',
      Icon: FaEdit
    },
    {
      customTemplate: (
        <UserProfileDeleteUser
          key="trash-tab"
          onClick={() =>
            handleDeleteUserProfile(() => {
              handleUserLogout();
              navigate('/login');
            })
          }
        >
          <FaTrash />
          <span>Eliminar Cuenta</span>
        </UserProfileDeleteUser>
      )
    }
  ];
  const content = [
    userProfile ? <Profile /> : <Loader />,
    <UserFollows />,
    <ChangePasswordUserProfile />,
    userProfile ? <EditProfile /> : <Loader />
  ];

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="user-profile-box-container">
        <div className="user-profile-title-container">
          <MMTitle content="Mi Perfil" />
        </div>
        <div className="user-profile-content">
          <MMVerticalNav Tabs={tabs} Content={content}></MMVerticalNav>
        </div>
      </MMBox>
    </MMContainer>
  );
};
