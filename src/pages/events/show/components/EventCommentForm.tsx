import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { InputArea } from '../../../../components/form/InputArea/InputArea';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { StyledButtonGroup } from '../../../admin/styles';
import { handleFormErrors } from '../../../../utils/handleFormErrors';
import { Comment, commentValidations } from '../../../../models/Comment';
import { createComment, updateComment } from '../../../../services/commentService';
import { isAxiosError } from 'axios';

type EventCommentFormProps = {
  eventId: string;
  isFormEdit?: boolean;
  commentToEdit?: Comment;
  closeModal: () => void;
  successCallback?: (comment: Comment) => void;
};

type FormData = {
  body: string;
};

export const EventCommentForm = ({
  eventId,
  isFormEdit,
  commentToEdit,
  successCallback,
  closeModal
}: EventCommentFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<FormData>();

  useEffect(() => {
    if (isFormEdit && commentToEdit) {
      reset({
        ...commentToEdit
      });
    } else {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormEdit, commentToEdit]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      let response;
      if (isFormEdit) {
        if (!commentToEdit) return closeModal();

        response = await updateComment(commentToEdit.id, data.body);
      } else {
        response = await createComment(eventId, data.body);
      }

      infoSnackbar(`Comentario ${isFormEdit ? 'editado' : 'añadido'} con éxito.`);

      successCallback && successCallback(response);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 403) {
        errorSnackbar('No tienes permisos para realizar esta acción');

        return closeModal();
      }

      let hasFormError = handleFormErrors(error, setError);

      !hasFormError &&
        errorSnackbar(`Error inesperado al ${isFormEdit ? 'editar' : 'agregar'} el comentario. Contacte a soporte.`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="events-reviews-form-container">
      <InputArea
        label="Comentario"
        name="body"
        register={register}
        errors={errors}
        options={commentValidations.body}
        rows={10}
      />

      <StyledButtonGroup>
        <MMButton type="submit" color="primary">
          {isFormEdit ? 'Editar' : 'Agregar'}
        </MMButton>
        <MMButton type="button" color="tertiary" onClick={closeModal}>
          Cerrar
        </MMButton>
      </StyledButtonGroup>
    </form>
  );
};
