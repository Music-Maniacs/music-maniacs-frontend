import React, { Dispatch } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { handleFormErrors } from '../../../../utils/handleFormErrors';
import { InputText } from '../../../../components/form/InputText/InputText';
import { User, userValidations } from '../../../../models/User';
import { InputArea } from '../../../../components/form/InputArea/InputArea';
import { LinksFieldArray } from '../../../../components/form/LinksFieldArray/LinksFieldArray';
import { StyledButtonGroup } from '../../styles';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { adminUpdateUser } from '../../../../services/userService';

type Props = {
  user: User;
  closeFormModal: () => void;
  setUser: Dispatch<React.SetStateAction<User | undefined>>;
};

type FormData = {
  full_name: string;
  username: string;
  email: string;
  biography: string;
  links_attributes: {
    id?: string;
    title: string;
    url: string;
    _destroy?: boolean;
  }[];
};

export const Form = ({ user, closeFormModal, setUser }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    setError,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      ...user,
      ...(user.links && user.links.length > 0
        ? { links_attributes: user.links.map((link) => ({ id: link.id, title: link.title, url: link.url })) }
        : {})
    }
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'links_attributes'
  });

  const inputCommonProps = { register, errors, type: 'text' };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await adminUpdateUser(
        user.id,
        data.full_name,
        data.username,
        data.email,
        data.biography,
        data.links_attributes
      );

      setUser(response);

      infoSnackbar('Usuario actualizado con exito');
      closeFormModal();
    } catch (error) {
      let hasFormError = handleFormErrors(error, setError);

      !hasFormError && errorSnackbar('Error inesperado al editar el usuario. Contacte a soporte.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="admin-form-container">
      <InputText label="Nombre Completo" name="full_name" options={userValidations.full_name} {...inputCommonProps} />

      <InputText label="Usuario" name="username" options={userValidations.username} {...inputCommonProps} />

      <InputText label="Email" name="email" options={userValidations.email} {...inputCommonProps} />

      {/* fixme: agregar rol cuando este */}

      <InputArea
        label="Biografía"
        name="biography"
        register={register}
        errors={errors}
        options={userValidations.biography}
      />

      <LinksFieldArray<FormData>
        register={register}
        errors={errors}
        fields={fields}
        append={append}
        update={update}
        remove={remove}
        getValues={getValues}
      />

      <input type="submit" hidden />

      <StyledButtonGroup>
        <MMButton type="submit" color="primary">
          Editar
        </MMButton>
        <MMButton type="button" color="tertiary" onClick={closeFormModal}>
          Cerrar
        </MMButton>
      </StyledButtonGroup>
    </form>
  );
};
