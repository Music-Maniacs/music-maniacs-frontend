import React, { Dispatch } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { handleFormErrors } from '../../../../utils/handleFormErrors';
import { InputText } from '../../../../components/form/InputText/InputText';
import { Genre, genreValidations } from '../../../../models/Genre';
import { StyledButtonGroup } from '../../styles';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { updateGenre } from '../../../../services/genreService';

type Props = {
  genre: Genre;
  closeFormModal: () => void;
  setGenre: Dispatch<React.SetStateAction<Genre | undefined>>;
};

type FormData = {
  name: string;
};

export const Form = ({ genre, closeFormModal, setGenre }: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>();

  const inputCommonProps = { register, errors, type: 'text' };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await updateGenre(
        genre.id,
        data.name
      );
      setGenre(response);
      infoSnackbar('Género actualizado con exito');
      closeFormModal();
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
        <MMButton type="button" color="tertiary" onClick={closeFormModal}>
          Cerrar
        </MMButton>
      </StyledButtonGroup>
    </form>
  );
};
