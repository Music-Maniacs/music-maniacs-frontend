import React, { Dispatch, useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { handleFormErrors } from '../../../../utils/handleFormErrors';
import { InputText } from '../../../../components/form/InputText/InputText';
import { User, userValidations } from '../../../../models/User';
import { InputArea } from '../../../../components/form/InputArea/InputArea';
import { LinksFieldArray } from '../../../../components/form/LinksFieldArray/LinksFieldArray';
import { StyledButtonGroup } from '../../../admin/styles';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { adminUpdateUser, updateProfile } from '../../../../services/userService';
import { InputSelect } from '../../../../components/form/InputSelect/InputSelect';
import { useUser } from '../../context/userContext';
import { Grid } from '@mui/material';
import { InputDropzone } from '../../../../components/form/InputDropzone/InputDropzone';

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
  images_attributes: {
    id: string;
    _destroy: boolean;
  };
  profile_image: File;
  cover_image: File;
};

export const EditProfile = () => {
  const { userProfile, setUserProfile } = useUser();
  const {
    register,
    control,
    handleSubmit,
    setError,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      ...userProfile,
      ...(userProfile && userProfile.links && userProfile.links.length > 0
        ? { links_attributes: userProfile.links.map((link) => ({ id: link.id, title: link.title, url: link.url })) }
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
      // const response = await updateProfile(
      //   data.full_name,
      //   data.username,
      //   data.email,
      //   data.biography,
      //   data.links_attributes,
      //   data.z
      // );

      // setUser(response);

      infoSnackbar('Perfil actualizado con exito');
    } catch (error) {
      let hasFormError = handleFormErrors(error, setError);

      !hasFormError && errorSnackbar('Error inesperado al editar el usuario. Contacte a soporte.');
    }
  };

  console.log(userProfile);
  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="admin-form-container">
      <InputDropzone
        label="Imaen de Perfil"
        name="profile_image"
        control={control}
        errors={errors}
        previewImageUrl={userProfile?.images[0]?.full_url ?? ''}
        acceptedFileTypes={{ 'image/*': ['.png', '.jpeg', '.jpg'] }}
      />
      <InputDropzone
        label="Imagen de portada"
        name="cover_image"
        control={control}
        errors={errors}
        previewImageUrl={userProfile?.images[0]?.full_url ?? ''}
        acceptedFileTypes={{ 'image/*': ['.png', '.jpeg', '.jpg'] }}
      />
      <InputText label="Nombre Completo" name="full_name" options={userValidations.full_name} {...inputCommonProps} />

      <InputText label="Usuario" name="username" options={userValidations.username} {...inputCommonProps} />

      <InputText label="Email" name="email" options={userValidations.email} {...inputCommonProps} />

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
      </StyledButtonGroup>
    </form>
  );
};
