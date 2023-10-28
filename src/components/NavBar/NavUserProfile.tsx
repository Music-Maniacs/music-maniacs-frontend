import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { PiUserCircleFill } from 'react-icons/pi';
import styled from 'styled-components';
import { useAuth } from '../../context/authContext';

const StyledNavUser = styled.div`
  width: max-content;
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
  cursor: pointer;
  .name {
    display: flex;
    flex-direction: column;
    align-items: start;
    .rol-dropdown {
      display: flex;
    }
  }
`;
const UserProfileImage = styled.div`
  border-radius: 50%;
  border: 1px solid #000;
  width: 40px;
  height: 40px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: inherit;
    height: inherit;
  }
`;

type Props = {
  active: boolean;
};
export const NavUserProfile = ({ active }: Props) => {
  const { user } = useAuth();
  return (
    <StyledNavUser>
      {user?.profile_image?.full_url ? (
        <UserProfileImage>
          <img src={user.profile_image.full_url} />
        </UserProfileImage>
      ) : (
        <PiUserCircleFill size={40} />
      )}
      <div className="name">
        <span> {user?.username ? user.username : 'User'}</span>
        <div className="rol-dropdown">
          <span>{user?.role?.name}</span>
          {active ? <IoMdArrowDropup size={20} /> : <IoMdArrowDropdown size={20} />}
        </div>
      </div>
    </StyledNavUser>
  );
};
