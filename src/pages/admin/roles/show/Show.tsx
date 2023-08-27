import { Stack } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MMBox } from '../../../../components/MMBox/MMBox';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { MMContainer } from '../../../../components/MMContainer/MMContainer';
import { MMTitle } from '../../../../components/MMTitle/MMTitle';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { Role } from '../../../../models/Role';
import { adminGetRole } from '../../../../services/roleService';
import { useRoles } from '../context/roleContext';
import Form from '../form/Form';
import { useRoleRequests } from '../hooks/useRoleRequest';

export const Show = () => {
  const { id } = useParams();
  const [role, setRole] = React.useState<Role>();
  const [update, setUpdate] = React.useState<boolean>(false);
  const permissions = useRef<string[]>([]);
  const navigate = useNavigate();
  const { handleDeleteRole } = useRoleRequests();
  const { setRoles, roles } = useRoles();

  useEffect(() => {
    getRole();
  }, []);

  const getRole = async () => {
    if (!id) return;

    try {
      const role = await adminGetRole(id);
      setRole(role);
      permissions.current = role.permission_ids ? role.permission_ids : [];
    } catch (error) {
      errorSnackbar('Error al obtener el rol. Contacte a soporte.');
      navigate(-1);
    }
  };

  const handleDeleteButton = (roleId: string | undefined) => {
    if (!roleId) return;
    handleDeleteRole(roleId, () => {
      const role = roles?.find((role) => role.id === roleId);
      if (!role) return;
      setRoles(roles?.filter((item) => item.id !== role.id));
      navigate(-1);
    });
  };

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <MMTitle content={update ? 'Editar Rol' : 'Rol'} />
          {update ? (
            <></>
          ) : (
            <Stack direction={'row'} spacing={1} justifyContent={'flex-end'}>
              <MMButton onClick={() => setUpdate(true)}>Editar</MMButton>
              <MMButton color="error" onClick={() => handleDeleteButton(role?.id)}>
                Eliminar
              </MMButton>
              <MMButton onClick={() => navigate(-1)}>Volver</MMButton>
            </Stack>
          )}
        </div>

        {role ? <Form type={update ? 'update' : 'show'} role={role} isUpdate={setUpdate} /> : <></>}
      </MMBox>
    </MMContainer>
  );
};

export default Show;
