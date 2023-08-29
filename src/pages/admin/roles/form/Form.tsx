import './Form.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { Role, roleValidation } from '../../../../models/Role';
import { adminCreateRole, adminUpdateRole } from '../../../../services/roleService';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputText } from '../../../../components/form/InputText/InputText';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { useRoles } from '../context/roleContext';
import { handleFormErrors } from '../../../../utils/handleFormErrors';
import { PermissionListInput } from '../../../../components/form/PermissionListInput/PermissionListInput';

type FormData = {
  name: string;
};

type Props = {
  type: 'create' | 'update' | 'show';
  role?: Role;
  isUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
};
export const Form = ({ type, role, isUpdate }: Props) => {
  const navigate = useNavigate();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(role ? role.permission_ids : []);
  const { setRoles, roles } = useRoles();

  const preloadValues = {
    name: role?.name
  };
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({ defaultValues: preloadValues });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (type === 'create') {
        const response = await adminCreateRole(data.name, selectedPermissions);
        setRoles((roles) => [response, ...(roles ? roles : [])]);
        infoSnackbar('Rol creado con exito');
        navigate(-1);
      } else {
        if (!role) return;
        const response = await adminUpdateRole(role.id, data.name, selectedPermissions);
        let newRoles = roles?.filter((item) => item.id !== role.id);
        newRoles = [response, ...(newRoles ? newRoles : [])];
        setRoles(newRoles);
        infoSnackbar('Rol actualizado con exito');
        navigate(-1);
      }
    } catch (error) {
      let hasFormError = handleFormErrors(error, setError);

      !hasFormError && errorSnackbar('Error inesperado al crear el usuario. Contacte a soporte.');
    }
  };

  const inputCommonProps = { register, errors, type: 'text' };
  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-inputs">
        <InputText
          className="name-input"
          label="Nombre"
          name="name"
          readOnly={type === 'show' ? true : false}
          options={roleValidation.name}
          style={type !== 'show' ? { maxWidth: '400px' } : {}}
          {...inputCommonProps}
        />
        {type === 'show' && role ? (
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
        ) : (
          <></>
        )}
      </div>
      <PermissionListInput
        readonly={type === 'show' ? true : false}
        selectedPermissions={selectedPermissions}
        setSelectedPermissions={setSelectedPermissions}
      />
      {type !== 'show' ? (
        <div className="role-form-buttons">
          <MMButton
            type="button"
            onClick={() => {
              if (type === 'update' && isUpdate) {
                if (!role) return;
                reset(preloadValues);
                setSelectedPermissions(role?.permission_ids);
                isUpdate(false);
              } else {
                navigate(-1);
              }
            }}
          >
            Cancelar
          </MMButton>
          <MMButton type="submit">{type === 'create' ? 'Crear Rol' : 'Guardar'}</MMButton>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
};

export default Form;
