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

type Props = {
  active: boolean;
};
export const NavUserProfile = ({ active }: Props) => {
  const { user } = useAuth();

  return (
    <StyledNavUser>
      <PiUserCircleFill size={40} />
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
