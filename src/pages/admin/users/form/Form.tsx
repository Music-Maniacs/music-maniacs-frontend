import React from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { useUsers } from '../context/userContext';
import { InputText } from '../../../../components/form/InputText/InputText';
import { userValidations } from '../../../../models/User';
import { LinksFieldArray } from '../../../../components/form/LinksFieldArray/LinksFieldArray';
import { StyledButtonGroup } from '../../styles';
import { InputArea } from '../../../../components/form/InputArea/InputArea';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { adminRegister } from '../../../../services/userService';
import { handleFormErrors } from '../../../../utils/handleFormErrors';

type FormData = {
  full_name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  biography: string;
  links_attributes: {
    title: string;
    url: string;
  }[];
};

export const Form = () => {
  const { closeFormModal, setUsers } = useUsers();

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
      const user = await adminRegister(
        data.full_name,
        data.username,
        data.email,
        data.password,
        data.password_confirmation,
        data.biography,
        data.links_attributes
      );

      setUsers((users) => [user, ...(users ? users : [])]);

      infoSnackbar('Usuario creado con exito');
      closeFormModal();
    } catch (error) {
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

      {/* fixme: agregar rol cuando este */}

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
