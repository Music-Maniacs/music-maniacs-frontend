import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { InputText } from '../../../../components/form/InputText/InputText';
import { PermissionListInput } from '../../../../components/form/PermissionListInput/PermissionListInput';
import { useModal } from '../../../../components/hooks/useModal';
import { MMBox } from '../../../../components/MMBox/MMBox';
import { MMButtonResponsive } from '../../../../components/MMButton/MMButtonResponsive';
import { MMContainer } from '../../../../components/MMContainer/MMContainer';
import { MMTitle } from '../../../../components/MMTitle/MMTitle';
import { MMModal } from '../../../../components/Modal/MMModal';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { useCollection } from '../../../../context/collectionContext';
import { Role } from '../../../../models/Role';
import { adminGetRole } from '../../../../services/roleService';
import Form from '../form/Form';
import { useRoleRequests } from '../hooks/useRoleRequest';
import './Show.scss';
import '../../Admin.scss';
import { Policy } from '../../../../models/Policy';
import { checkPolicy } from '../../../../services/policyService';
import { isAxiosError } from 'axios';
import { formatDate } from '../../../../utils/formatDate';

export const Show = () => {
  const { id } = useParams();
  const [role, setRole] = useState<Role>();
  const navigate = useNavigate();
  const { handleDeleteRole } = useRoleRequests();
  const { openModal, isModalOpen, closeModal } = useModal();
  const { removeRoleInCollection } = useCollection();
  const [policies, setPolicies] = useState<Policy>();

  useEffect(() => {
    getRole();
    getPolicy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRole = async () => {
    if (!id) return;

    try {
      const role = await adminGetRole(id);
      setRole(role);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 403) {
        errorSnackbar('No tienes permisos para realizar esta acción');

        return navigate('/');
      }
      errorSnackbar('Error al obtener el rol. Contacte a soporte.');
      navigate(-1);
    }
  };

  const getPolicy = async () => {
    try {
      const response = await checkPolicy('Admin::RolesController');

      setPolicies(response);
    } catch (error) {
      errorSnackbar('Error al obtener los permisos. Contacte a soporte');
    }
  };

  const handleDeleteButton = (roleId: string | undefined) => {
    if (!roleId) return;
    handleDeleteRole(roleId, () => {
      removeRoleInCollection(roleId);
      navigate(-1);
    });
  };

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <MMTitle content="Rol" />
          <Stack direction={'row'} spacing={1} justifyContent={'flex-end'}>
            {policies?.update && (
              <MMButtonResponsive Icon={FaEdit} onClick={() => openModal()}>
                Editar
              </MMButtonResponsive>
            )}

            {policies?.destroy && (
              <MMButtonResponsive Icon={FaTrash} color="error" onClick={() => handleDeleteButton(role?.id)}>
                Eliminar
              </MMButtonResponsive>
            )}

            <MMButtonResponsive Icon={FaArrowLeft} onClick={() => navigate(-1)}>
              Volver
            </MMButtonResponsive>
          </Stack>
        </div>

        {role && (
          <div className="role-show-container">
            <div className="role-show-text-inputs">
              <InputText
                className="name-input"
                label="Nombre"
                name="name"
                readOnly={true}
                type="text"
                value={role.name}
              />
              <div className="role-date-input-container">
                <InputText
                  label="Creado El"
                  name="created_at"
                  value={role.created_at ? formatDate({ date: role.created_at, format: 'slashWithTime' }) : ''}
                  type="text"
                  readOnly={true}
                />
                <InputText
                  label="Actualizado El"
                  name="updated_at"
                  value={role.updated_at ? formatDate({ date: role.updated_at, format: 'slashWithTime' }) : ''}
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
