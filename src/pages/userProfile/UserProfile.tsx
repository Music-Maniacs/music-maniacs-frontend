import { useState } from 'react';
import { FaEdit, FaStar, FaTrash, FaUser } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { styled } from 'styled-components';
import { MMBox } from '../../components/MMBox/MMBox';
import { MMContainer } from '../../components/MMContainer/MMContainer';
import { MMTab } from '../../components/MMTab/MMTab';
import { MMTitle } from '../../components/MMTitle/MMTitle';
import { MMVerticalNav } from '../../components/MMVerticalNav/MMVerticalNav';
import colors from '../../styles/_colors.scss';
import './index.scss';

const UserProfileContent = styled.div`
  display: none;
  &:target {
    display: block;
  }
`;
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
  const [currentTab, setCurrentTab] = useState('profile');

  const tabs = [
    <MMTab
      href="#profile"
      label={'Perfil'}
      Icon={FaUser}
      // active={currentTab === 'profile'}
      onClick={() => setCurrentTab('profile')}
      key="profile-tab"
    />,
    <MMTab
      href="#follows"
      label={'Gestionar Seguimientos'}
      Icon={FaStar}
      // active={currentTab === 'follows'}
      onClick={() => setCurrentTab('follows')}
      key="follow-tab"
    />,
    <MMTab
      href="#password"
      label={'Cambiar Contraseña'}
      Icon={FaGear}
      // active={currentTab === 'password'}
      onClick={() => setCurrentTab('password')}
      key="password-tab"
    />,
    <MMTab
      href="#edit"
      label={'Editar Perfil'}
      Icon={FaEdit}
      // active={currentTab === 'edit'}
      onClick={() => setCurrentTab('edit')}
      key="edit-tab"
    />,
    <UserProfileDeleteUser key="trash-tab">
      <FaTrash />
      Eliminar Cuenta
    </UserProfileDeleteUser>
  ];
  const content = [
    <UserProfileContent id="profile" key="profile-content">
      Perfil
    </UserProfileContent>,
    <UserProfileContent id="follows" key="follows-content">
      Seguidos
    </UserProfileContent>,
    <UserProfileContent id="password" key="password-content">
      Contraseña
    </UserProfileContent>,
    <UserProfileContent id="edit" key="edit-content">
      Editar
    </UserProfileContent>
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
