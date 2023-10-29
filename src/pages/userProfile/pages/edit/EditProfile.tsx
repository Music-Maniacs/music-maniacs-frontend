import React, { useEffect } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { handleFormErrors } from '../../../../utils/handleFormErrors';
import { InputText } from '../../../../components/form/InputText/InputText';
import { userValidations } from '../../../../models/User';
import { InputArea } from '../../../../components/form/InputArea/InputArea';
import { LinksFieldArray } from '../../../../components/form/LinksFieldArray/LinksFieldArray';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { useUser } from '../../context/userContext';
import { Grid, GridProps } from '@mui/material';
import { InputDropzone } from '../../../../components/form/InputDropzone/InputDropzone';
import { styled } from 'styled-components';
import { updateProfile } from '../../../../services/userProfileService';
import { useAuth } from '../../../../context/authContext';

const StyledImageDropzoneContainer = styled.div`
  border: 1px #1e2e2c solid;
  padding: 10px;
  border-radius: 5px;
`;

const UserProfileEditButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 1rem 0rem;
  gap: 0.5rem;
  justify-self: stretch;
  width: 100%;
`;
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
  const { setUser } = useAuth();
  const { userProfile, setUserProfile } = useUser();
  const {
    register,
    control,
    handleSubmit,
    setError,
    reset,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      ...userProfile,
      profile_image: undefined,
      cover_image: undefined,
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

  useEffect(() => {
    reset({
      full_name: userProfile?.full_name,
      biography: userProfile?.biography,
      username: userProfile?.username,
      email: userProfile?.email,
      links_attributes: userProfile?.links?.map((link) => ({ id: link.id, title: link.title, url: link.url }))
    });
  }, [userProfile]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await updateProfile(
        data.full_name,
        data.username,
        data.email,
        data.biography,
        data.links_attributes,
        data.images_attributes,
        data.profile_image,
        data.cover_image
      );

      setUserProfile(response);
      setUser(response);
      document.getElementById('user_profile_tab')?.click(); //POLEMICO
      infoSnackbar('Perfil actualizado con exito');
    } catch (error) {
      let hasFormError = handleFormErrors(error, setError);

      !hasFormError && errorSnackbar('Error inesperado al editar el usuario. Contacte a soporte.');
    }
  };

  const gridCommonProps: GridProps = {
    item: true,
    xs: 12,
    sm: 12,
    md: 6,
    lg: 6,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="admin-form-container">
      <Grid container direction={'row'} spacing={2}>
        <Grid item style={{ width: '100%' }}>
          <InputDropzone
            label="Imagen de portada"
            name="cover_image"
            control={control}
            errors={errors}
            type="cover"
            previewImageUrl={userProfile && userProfile.cover_image ? userProfile.cover_image.full_url : ''}
            acceptedFileTypes={{ 'image/*': ['.png', '.jpeg', '.jpg'] }}
          />
        </Grid>
        <Grid container item spacing={2}>
          <Grid container item {...gridCommonProps}>
            <StyledImageDropzoneContainer>
              <InputDropzone
                label="Imagen de Perfil"
                name="profile_image"
                control={control}
                errors={errors}
                type="profile"
                width={'200px'}
                previewImageUrl={userProfile && userProfile.profile_image ? userProfile.profile_image.full_url : ''}
                acceptedFileTypes={{ 'image/*': ['.png', '.jpeg', '.jpg'] }}
              />
            </StyledImageDropzoneContainer>
          </Grid>
          <Grid container item {...gridCommonProps}>
            <InputText
              label="Nombre Completo"
              name="full_name"
              options={userValidations.full_name}
              {...inputCommonProps}
            />

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
          </Grid>
        </Grid>
      </Grid>
      <UserProfileEditButtonGroup>
        <MMButton type="button" color="primary" onClick={() => reset()}>
          Cancelar
        </MMButton>
        <MMButton type="submit" color="primary">
          Confirmar Cambios
        </MMButton>
      </UserProfileEditButtonGroup>
    </form>
  );
};
