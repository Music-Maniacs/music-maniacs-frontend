import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { handleFormErrors } from '../../../../utils/handleFormErrors';
import { InputText } from '../../../../components/form/InputText/InputText';
import { genreValidations } from '../../../../models/Genre';
import { StyledButtonGroup } from '../../styles';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { updateGenre } from '../../../../services/genreService';
import { useGenres } from './../context/genreContext';

type FormData = {
  name: string;
};


export const FormEdit = () => {
  const { genre, setGenre, setGenres, closeFormModalForEdit } = useGenres();
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>();

  const inputCommonProps = { register, errors, type: 'text' };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (genre){
        await updateGenre(
          genre.id,
          data.name
        );
        setGenres(prevGenres => prevGenres?.map(oldGenre =>
          oldGenre.id === genre.id ? { ...oldGenre, name : data.name } : oldGenre
        ));
        infoSnackbar('Género actualizado con exito');
        setGenre(undefined);
      }
      closeFormModalForEdit();
    } catch (error) {
      let hasFormError = handleFormErrors(error, setError);

      !hasFormError && errorSnackbar('Error inesperado al editar el género. Contacte a soporte.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="admin-form-container">
      <InputText label="Nombre" name="name" options={genreValidations.name} {...inputCommonProps} />

      <input type="submit" hidden />

      <StyledButtonGroup>
        <MMButton type="submit" color="primary">
          Editar
        </MMButton>
        <MMButton type="button" color="tertiary" onClick={closeFormModalForEdit}>
          Cerrar
        </MMButton>
      </StyledButtonGroup>
    </form>
  );
};
