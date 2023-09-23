import { useState } from 'react';
import { FaEdit, FaStar, FaUser } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { styled } from 'styled-components';
import { MMBox } from '../../components/MMBox/MMBox';
import { MMChip } from '../../components/MMChip/MMChip';
import { MMContainer } from '../../components/MMContainer/MMContainer';
import { MMTab } from '../../components/MMTab/MMTab';
import { MMTitle } from '../../components/MMTitle/MMTitle';
import { MMVerticalNav } from '../../components/MMVerticalNav/MMVerticalNav';
import { ProfileSidenav } from './components/ProfileSidenav';
import './index.scss';
const UserProfileContent = styled.div`
  display: none;
  &:target {
    display: block;
  }
`;
export const UserProfile = () => {
  const [currentTab, setCurrentTab] = useState('profile');
  const tabs = [
    <MMTab
      href="#profile"
      label={'Perfil'}
      Icon={FaUser}
      chip={<MMChip color="info">10</MMChip>}
      active={currentTab === 'profile'}
      onClick={() => setCurrentTab('profile')}
    />,
    <MMTab
      href="#follows"
      label={'Gestionar Seguimientos'}
      Icon={FaStar}
      chip={<MMChip color="info">10</MMChip>}
      active={currentTab === 'follows'}
      onClick={() => setCurrentTab('follows')}
    />,
    <MMTab
      href="#password"
      label={'Cambiar Contraseña'}
      Icon={FaGear}
      chip={<MMChip color="info">10</MMChip>}
      active={currentTab === 'password'}
      onClick={() => setCurrentTab('password')}
    />,
    <MMTab
      href="#edit"
      label={'Editar Perfil'}
      Icon={FaEdit}
      chip={<MMChip color="info">10</MMChip>}
      active={currentTab === 'edit'}
      onClick={() => setCurrentTab('edit')}
    />
  ];
  const content = [
    <UserProfileContent id="profile">Perfil</UserProfileContent>,
    <UserProfileContent id="follows">Seguidos</UserProfileContent>,
    <UserProfileContent id="password">Contraseña</UserProfileContent>,
    <UserProfileContent id="edit">Editar</UserProfileContent>
  ];
  return (
    <MMContainer maxWidth="xl">
      <MMBox className="user-profile-box-container">
        <div className="user-profile-title-container">
          <MMTitle content="Mi Perfil" />
        </div>
        <div className="user-profile-content">
          {/* <ProfileSidenav /> */}
          <MMVerticalNav Tabs={tabs} Content={content}></MMVerticalNav>
        </div>
      </MMBox>
    </MMContainer>
  );
};
