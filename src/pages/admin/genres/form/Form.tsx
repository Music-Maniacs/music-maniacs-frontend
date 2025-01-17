import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { useGenres } from '../context/genreContext';
import { InputText } from '../../../../components/form/InputText/InputText';
import { genreValidations } from '../../../../models/Genre';
import { StyledButtonGroup } from '../../styles';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { createGenre, updateGenre } from '../../../../services/genreService';
import { handleFormErrors } from '../../../../utils/handleFormErrors';
import { useCollection } from '../../../../context/collectionContext';
import { isAxiosError } from 'axios';

type FormData = {
  name: string;
};

export const Form = () => {
  const { closeFormModal, setGenres, genreToEdit, isFormModalOpen } = useGenres();
  const { updateGenreInCollection, addGenreToCollection } = useCollection();
  const isFormEdit = !!genreToEdit;

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<FormData>();

  useEffect(() => {
    if (isFormEdit) {
      // Edit
      reset({ name: genreToEdit.name });
    } else {
      // Create
      reset();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormModalOpen]);

  const inputCommonProps = { register, errors, type: 'text' };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = isFormEdit ? await updateGenre(genreToEdit.id, data.name) : await createGenre(data.name);

      if (isFormEdit) {
        setGenres((prevGenres) =>
          prevGenres?.map((oldGenre) => (oldGenre.id === genreToEdit.id ? response : oldGenre))
        );
        updateGenreInCollection(response);
      } else {
        setGenres((genres) => [response, ...(genres ? genres : [])]);
        addGenreToCollection(response);
      }

      infoSnackbar(`Género ${isFormEdit ? 'actualizado' : 'creado'} con exito`);
      closeFormModal();
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 403) {
        errorSnackbar(`No tienes permisos para ${isFormEdit ? 'actualizar' : 'crear'} géneros`);

        return closeFormModal();
      }

      let hasFormError = handleFormErrors(error, setError);

      !hasFormError &&
        errorSnackbar(`Error inesperado al ${isFormEdit ? 'actualizado' : 'creado'} género. Contacte a soporte.`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="admin-form-container">
      <InputText label="Nombre" name="name" options={genreValidations.name} {...inputCommonProps} />

      <input type="submit" hidden />

      <StyledButtonGroup>
        <MMButton type="submit" color="primary">
          {isFormEdit ? 'Editar' : 'Crear'}
        </MMButton>
        <MMButton type="button" color="tertiary" onClick={closeFormModal}>
          Cerrar
        </MMButton>
      </StyledButtonGroup>
    </form>
  );
};
