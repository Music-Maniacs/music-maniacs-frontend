import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { useGenres } from '../context/genreContext';
import { InputText } from '../../../../components/form/InputText/InputText';
import { genreValidations } from '../../../../models/Genre';
import { StyledButtonGroup } from '../../styles';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { createGenre } from '../../../../services/genreService';
import { handleFormErrors } from '../../../../utils/handleFormErrors';

type FormData = {
  name: string;
};

export const FormCreate = () => {
  const { closeFormModalForCreate, setGenres } = useGenres();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>();

  const inputCommonProps = { register, errors, type: 'text' };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {

      const genre = await createGenre(
        data.name
      );
      
      setGenres((genres) => [genre, ...(genres ? genres : [])]);

      infoSnackbar('Género creado con exito');
      closeFormModalForCreate();
    } catch (error) {
      let hasFormError = handleFormErrors(error, setError);

      !hasFormError && errorSnackbar('Error inesperado al crear género. Contacte a soporte.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="admin-form-container">
      <InputText label="Nombre" name="name" options={genreValidations.name} {...inputCommonProps} />
      
      <input type="submit" hidden />

      <StyledButtonGroup>
        <MMButton type="submit" color="primary">
          Crear
        </MMButton>
        <MMButton type="button" color="tertiary" onClick={closeFormModalForCreate}>
          Cerrar
        </MMButton>
      </StyledButtonGroup>
    </form>
  );
};
