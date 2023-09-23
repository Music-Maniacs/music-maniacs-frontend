import { FaEdit, FaStar, FaUser } from 'react-icons/fa';
import { FaGear, FaTrashCan } from 'react-icons/fa6';
import { styled } from 'styled-components';
import colors from '../../../styles/_colors.scss';
import { MMTab } from '../../../components/MMTab/MMTab';
import { MMChip } from '../../../components/MMChip/MMChip';
const ProfileSidenavContainer = styled.ul`
  display: flex;
  padding: 0px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-right: 3px solid var(--Modal-Background, #4e504e);
`;

const ProfileSidenavTabDelete = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  align-self: stretch;
  border-radius: 10px;
  background: none;
  border: 1px;
  color: ${colors.error};

  &:hover {
    border: 1px solid ${colors.error};
  }
`;

export const ProfileSidenav = () => {
  return (
    <>
      <ProfileSidenavContainer>
        <MMTab href="#profile" label={'Perfil'} Icon={FaUser} chip={<MMChip color="info">10</MMChip>} active={true} />
        <MMTab
          href="#follows"
          label={'Gestionar Seguimientos'}
          Icon={FaStar}
          chip={<MMChip color="info">10</MMChip>}
          active={false}
        />
        <MMTab
          href="#password"
          label={'Cambiar Contraseña'}
          Icon={FaGear}
          chip={<MMChip color="info">10</MMChip>}
          active={false}
        />
        <MMTab
          href="#edit"
          label={'Editar Perfil'}
          Icon={FaEdit}
          chip={<MMChip color="info">10</MMChip>}
          active={false}
        />

        <ProfileSidenavTabDelete>
          <FaTrashCan />
          Eliminar Cuenta
        </ProfileSidenavTabDelete>
      </ProfileSidenavContainer>
    </>
  );
};
