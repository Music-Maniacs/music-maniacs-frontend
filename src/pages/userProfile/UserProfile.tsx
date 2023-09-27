import { useState } from 'react';
import { FaEdit, FaStar, FaTrash, FaUser } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { styled } from 'styled-components';
import { MMBox } from '../../components/MMBox/MMBox';
import { MMContainer } from '../../components/MMContainer/MMContainer';
import { MMTab } from '../../components/MMVerticalNav/MMTab';
import { MMTitle } from '../../components/MMTitle/MMTitle';
import { MMVerticalNav } from '../../components/MMVerticalNav/MMVerticalNav';
import colors from '../../styles/_colors.scss';
import './index.scss';
import { Profile } from './pages/profile/Profile';
import { EditProfile } from './pages/edit/EditProfile';
import { useUser } from './context/userContext';
import { Loader } from '../../components/Loader/Loader';

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
`;
export const UserProfile = () => {
  const { userProfile } = useUser();
  const tabs = [
    {
      href: '#profile',
      label: 'Perfil',
      Icon: FaUser
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
        <UserProfileDeleteUser key="trash-tab">
          <FaTrash />
          Eliminar Cuenta
        </UserProfileDeleteUser>
      )
    }
  ];
  const content = [
    <Profile />,
    <span>Seguidos</span>,
    <span>Contraseña</span>,
    userProfile ? <EditProfile /> : <Loader />
  ];

  return (
    <MMContainer maxWidth="xl">
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
