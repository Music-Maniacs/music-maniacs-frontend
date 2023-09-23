import { MMBox } from '../../components/MMBox/MMBox';
import { MMContainer } from '../../components/MMContainer/MMContainer';
import { MMTitle } from '../../components/MMTitle/MMTitle';
import { ProfileSidenav } from './components/ProfileSidenav';
import './index.scss';

export const UserProfile = () => {
  return (
    <MMContainer maxWidth="xl">
      <MMBox className="user-profile-box-container">
        <div className="user-profile-title-container">
          <MMTitle content="Mi Perfil" />
        </div>
        <div className="user-profile-content">
          <ProfileSidenav />
        </div>
      </MMBox>
    </MMContainer>
  );
};
