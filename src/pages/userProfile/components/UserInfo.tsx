import { FiUser } from 'react-icons/fi';
import { styled } from 'styled-components';
import { MMChip } from '../../../components/MMChip/MMChip';
import { Image } from '../../../models/Image';
import { Role } from '../../../models/Role';

const UserProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
`;
const UserProfileImage = styled.div`
  border-radius: 50%;
  border: 1px solid #000;
  width: 150px;
  height: 150px;
  overflow: hidden;
  img {
    width: inherit;
    height: inherit;
  }
  svg {
    width: inherit;
    height: inherit;
  }
`;
const UserProfileData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;

  h3 {
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0;
  }
  span {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
type UserInfoProps = {
  profileImage?: Image;
  fullName?: string;
  role?: Role;
  username?: string;
};
export const UserInfo = ({ profileImage, fullName, role, username }: UserInfoProps) => {
  return (
    <UserProfileInfoContainer>
      <UserProfileImage>{profileImage ? <img src={profileImage.full_url} alt="" /> : <FiUser />}</UserProfileImage>
      <UserProfileData>
        <h3>{fullName}</h3>
        {role && <MMChip color="primary">{role.name}</MMChip>}
        <span>{`@${username}`}</span>
      </UserProfileData>
    </UserProfileInfoContainer>
  );
};
