import './Form.scss';
import React, { SetStateAction, useState } from 'react';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { Role, roleValidation } from '../../../../models/Role';
import { adminCreateRole, adminUpdateRole } from '../../../../services/roleService';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputText } from '../../../../components/form/InputText/InputText';
import { MMButton } from '../../../../components/MMButton/MMButton';

import { handleFormErrors } from '../../../../utils/handleFormErrors';
import { PermissionListInput } from '../../../../components/form/PermissionListInput/PermissionListInput';

type FormData = {
  name: string;
};

type Props = {
  type: 'create' | 'update';
  role?: Role;
  setRole?: React.Dispatch<SetStateAction<Role | undefined>>;
  closeFormModal?: () => void;
  roleList?: Role[];
  setRoleList?: React.Dispatch<SetStateAction<Role[] | undefined>>;
};
export const Form = ({ type, role, setRole, closeFormModal, roleList, setRoleList }: Props) => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(role ? role.permission_ids : []);

  const preloadValues = {
    name: role?.name
  };
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({ defaultValues: preloadValues });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (type === 'create') {
        if (roleList && setRoleList) {
          const response = await adminCreateRole(data.name, selectedPermissions);
          setRoleList((roleList) => [response, ...(roleList ? roleList : [])]);
        }
        infoSnackbar('Rol creado con exito');
        if (closeFormModal) closeFormModal();
      } else {
        if (!role) return;
        const response = await adminUpdateRole(role.id, data.name, selectedPermissions);
        response.permission_ids = selectedPermissions;
        if (setRole) setRole(response);
        infoSnackbar('Rol actualizado con exito');
        if (closeFormModal) closeFormModal();
      }
    } catch (error) {
      let hasFormError = handleFormErrors(error, setError);

      !hasFormError && errorSnackbar('Error inesperado al crear el usuario. Contacte a soporte.');
    }
  };

  const inputCommonProps = { register, errors, type: 'text' };
  return (
    <form className="role-form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="role-text-inputs">
        <InputText label="Nombre" name="name" options={roleValidation.name} {...inputCommonProps} />
      </div>
      <PermissionListInput
        key={'ctrl'}
        disabled={false}
        selectedPermissions={selectedPermissions}
        setSelectedPermissions={setSelectedPermissions}
      />

      <div className="role-form-buttons">
        <MMButton
          type="button"
          onClick={() => {
            if (type === 'update') {
              if (!role) return;
              setSelectedPermissions(role?.permission_ids);
            }
            if (closeFormModal) closeFormModal();
          }}
        >
          Cancelar
        </MMButton>
        <MMButton type="submit">{type === 'create' ? 'Crear Rol' : 'Guardar'}</MMButton>
      </div>
    </form>
  );
};

export default Form;
