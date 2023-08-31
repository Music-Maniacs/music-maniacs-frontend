import { Stack } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { InputText } from '../../../../components/form/InputText/InputText';
import { PermissionListInput } from '../../../../components/form/PermissionListInput/PermissionListInput';
import { useModal } from '../../../../components/hooks/useModal';
import { MMBox } from '../../../../components/MMBox/MMBox';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { MMButtonResponsive } from '../../../../components/MMButton/MMButtonResponsive';
import { MMContainer } from '../../../../components/MMContainer/MMContainer';
import { MMTitle } from '../../../../components/MMTitle/MMTitle';
import { MMModal } from '../../../../components/Modal/MMModal';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { Role } from '../../../../models/Role';
import { adminGetRole } from '../../../../services/roleService';
import Form from '../form/Form';
import { useRoleRequests } from '../hooks/useRoleRequest';
import './Show.scss';
export const Show = () => {
  const { id } = useParams();
  const [role, setRole] = React.useState<Role>();
  const navigate = useNavigate();
  const { handleDeleteRole } = useRoleRequests();
  const { openModal, isModalOpen, closeModal } = useModal();

  useEffect(() => {
    getRole();
  }, []);

  const getRole = async () => {
    if (!id) return;

    try {
      const role = await adminGetRole(id);
      setRole(role);
    } catch (error) {
      errorSnackbar('Error al obtener el rol. Contacte a soporte.');
      navigate(-1);
    }
  };

  const handleDeleteButton = (roleId: string | undefined) => {
    if (!roleId) return;
    handleDeleteRole(roleId, () => {
      navigate(-1);
    });
  };

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <MMTitle content="Rol" />
          <Stack direction={'row'} spacing={1} justifyContent={'flex-end'}>
            <MMButtonResponsive Icon={FaEdit} onClick={() => openModal()}>
              Editar
            </MMButtonResponsive>
            <MMButtonResponsive Icon={FaTrash} color="error" onClick={() => handleDeleteButton(role?.id)}>
              Eliminar
            </MMButtonResponsive>
            <MMButtonResponsive Icon={FaArrowLeft} onClick={() => navigate(-1)}>
              Volver
            </MMButtonResponsive>
          </Stack>
        </div>

        {role && (
          <div className="show-container">
            <div className="show-text-inputs">
              <InputText
                className="name-input"
                label="Nombre"
                name="name"
                readOnly={true}
                type="text"
                value={role.name}
              />
              <div className="date-input-container">
                <InputText
                  className="date-input"
                  label="Creado El"
                  name="created_at"
                  value={role.created_at}
                  type="text"
                  readOnly={true}
                />
                <InputText
                  className="date-input"
                  label="Actualizado El"
                  name="updated_at"
                  value={role.updated_at}
                  type="text"
                  readOnly={true}
                />
              </div>
            </div>
            <PermissionListInput disabled={true} selectedPermissions={role.permission_ids} />
          </div>
        )}

        <MMModal isModalOpen={isModalOpen} closeModal={closeModal} maxWidth="md" title="Editar Rol">
          <Form type="update" role={role} closeFormModal={closeModal} setRole={setRole} />
        </MMModal>
      </MMBox>
    </MMContainer>
  );
};

export default Show;
