import React, { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { useUsers } from '../context/usersContext';
import { InputText } from '../../../../components/form/InputText/InputText';
import { userValidations } from '../../../../models/User';
import { LinksFieldArray } from '../../../../components/form/LinksFieldArray/LinksFieldArray';
import { StyledButtonGroup } from '../../styles';
import { InputArea } from '../../../../components/form/InputArea/InputArea';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { adminCreateUser } from '../../../../services/userService';
import { handleFormErrors } from '../../../../utils/handleFormErrors';
import { useCollection } from '../../../../context/collectionContext';
import { InputSelect } from '../../../../components/form/InputSelect/InputSelect';
import { SelectCollection } from '../../../../models/Generic';
import { isAxiosError } from 'axios';

type FormData = {
  full_name: string;
  username: string;
  email: string;
  role: SelectCollection;
  password: string;
  password_confirmation: string;
  biography: string;
  links_attributes: {
    title: string;
    url: string;
  }[];
};

export const Form = () => {
  const [rolesCollection, setRolesCollection] = useState<SelectCollection[]>([]);
  const { closeFormModal, setUsers } = useUsers();

  const { getRolesCollection } = useCollection();

  useEffect(() => {
    getRolesCollection().then((roles) => setRolesCollection(roles));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors }
  } = useForm<FormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links_attributes'
  });

  const inputCommonProps = { register, errors, type: 'text' };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const user = await adminCreateUser(
        data.full_name,
        data.username,
        data.email,
        data.role.value,
        data.password,
        data.password_confirmation,
        data.biography,
        data.links_attributes
      );

      setUsers((users) => [user, ...(users ? users : [])]);

      infoSnackbar('Usuario creado con exito');
      closeFormModal();
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 403) {
        errorSnackbar('No tienes permisos crear usuarios.');

        return closeFormModal();
      }

      let hasFormError = handleFormErrors(error, setError);

      !hasFormError && errorSnackbar('Error inesperado al crear el usuario. Contacte a soporte.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="admin-form-container">
      <InputText label="Nombre Completo" name="full_name" options={userValidations.full_name} {...inputCommonProps} />

      <InputText label="Usuario" name="username" options={userValidations.username} {...inputCommonProps} />

      <InputText label="Email" name="email" options={userValidations.email} {...inputCommonProps} />

      <InputText
        label="Contraseña"
        type="password"
        name="password"
        register={register}
        errors={errors}
        options={userValidations.password}
      />

      <InputText
        label="Repetir Contraseña"
        type="password"
        name="password_confirmation"
        register={register}
        errors={errors}
        options={{
          required: { value: true, message: 'Debe repetir su contraseña' },
          validate: (value) => value === watch('password', '') || 'Las contraseñas no coinciden'
        }}
      />

      <InputSelect
        name="role"
        label="Rol"
        control={control}
        errors={errors}
        collection={rolesCollection}
        options={userValidations.role}
        isClearable={false}
      />

      <InputArea
        label="Biografía"
        name="biography"
        register={register}
        errors={errors}
        options={userValidations.biography}
      />

      <LinksFieldArray<FormData> register={register} errors={errors} fields={fields} append={append} remove={remove} />

      <input type="submit" hidden />

      <StyledButtonGroup>
        <MMButton type="submit" color="primary">
          Crear
        </MMButton>
        <MMButton type="button" color="tertiary" onClick={closeFormModal}>
          Cerrar
        </MMButton>
      </StyledButtonGroup>
    </form>
  );
};
