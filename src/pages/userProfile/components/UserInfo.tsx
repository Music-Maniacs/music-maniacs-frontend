import { FiUser } from 'react-icons/fi';
import { styled } from 'styled-components';
import { MMChip } from '../../../components/MMChip/MMChip';
import { Image } from '../../../models/Image';
import { Role } from '../../../models/Role';
import breakpoints from '../../../styles/_breakpoints.scss';

const UserProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  width: 100%;

  @media screen and (max-width: ${breakpoints.md}) {
    gap: 1rem;
  }
`;
const UserProfileImage = styled.div`
  border-radius: 50%;
  border: 1px solid #000;
  width: 150px;
  height: 150px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: inherit;
    height: inherit;
  }
  svg {
    width: inherit;
    height: inherit;
  }

  @media screen and (max-width: ${breakpoints.md}) {
    width: 100px !important;
    height: 100px !important;
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

    @media screen and (max-width: ${breakpoints.sm}) {
      max-width: 120px;
    }
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
