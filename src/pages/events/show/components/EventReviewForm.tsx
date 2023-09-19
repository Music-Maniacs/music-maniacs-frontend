import React, { ChangeEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { InputArea } from '../../../../components/form/InputArea/InputArea';
import { Review, reviewValidations } from '../../../../models/Review';
import { InputRating } from '../../../../components/form/InputRating/InputRating';
import { StyledInputContainer, StyledLabel } from '../../../../components/form/formStyles';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { Grid, GridProps } from '@mui/material';
import { StyledButtonGroup } from '../../../admin/styles';
import { createReview, updateReview } from '../../../../services/reviewsService';
import { handleFormErrors } from '../../../../utils/handleFormErrors';

type EventReviewFormProps = {
  eventId: string;
  isFormEdit?: boolean;
  reviewToEdit?: Review;
  closeModal: () => void;
  artistName: string;
  venueName: string;
  producerName: string;
  successCallback?: (review: Review) => void;
};

type FormData = {
  rating: number;
  description: string;
};

export const EventReviewForm = ({
  eventId,
  isFormEdit,
  reviewToEdit,
  artistName,
  venueName,
  producerName,
  successCallback,
  closeModal
}: EventReviewFormProps) => {
  const [reviewTo, setReviewTo] = useState<'artist' | 'venue' | 'producer'>('artist');
  const {
    register,
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      rating: 0
    }
  });

  useEffect(() => {
    if (isFormEdit && reviewToEdit) {
      setReviewTo(reviewToEdit.reviewable_type.toLowerCase() as 'artist' | 'venue' | 'producer');
      reset({
        ...reviewToEdit
      });
    } else {
      setReviewTo('artist');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormEdit, reviewToEdit]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      let response;
      if (isFormEdit) {
        if (!reviewToEdit) return closeModal();

        response = await updateReview(reviewToEdit.id, data.rating, data.description);
      } else {
        response = await createReview(data.rating, data.description, eventId, reviewTo);
      }

      infoSnackbar(`Reseña ${isFormEdit ? 'editada' : 'agregada'} con éxito.`);

      successCallback && successCallback(response);
    } catch (error) {
      let hasFormError = handleFormErrors(error, setError);

      !hasFormError &&
        errorSnackbar(`Error inesperado al ${isFormEdit ? 'editar' : 'agregar'} la reseña. Contacte a soporte.`);
    }
  };

  const gridCommonProps: GridProps = {
    item: true,
    xs: 12,
    sm: 12,
    md: 4
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="events-reviews-form-container">
      <StyledInputContainer>
        <StyledLabel>Reseña sobre:</StyledLabel>

        <Grid container spacing={2}>
          <Grid {...gridCommonProps}>
            <input
              type="radio"
              name="reviewTo"
              value="artist"
              checked={reviewTo === 'artist'}
              disabled={isFormEdit}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.checked && setReviewTo('artist');
              }}
            />
            <label>{artistName}</label>
          </Grid>

          <Grid {...gridCommonProps}>
            <input
              type="radio"
              name="reviewTo"
              value="venue"
              checked={reviewTo === 'venue'}
              disabled={isFormEdit}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.checked && setReviewTo('venue');
              }}
            />
            <label>{venueName}</label>
          </Grid>

          <Grid {...gridCommonProps}>
            <input
              type="radio"
              name="reviewTo"
              value="producer"
              checked={reviewTo === 'producer'}
              disabled={isFormEdit}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.checked && setReviewTo('producer');
              }}
            />
            <label>{producerName}</label>
          </Grid>
        </Grid>
      </StyledInputContainer>

      <InputRating
        label="Calificación"
        name="rating"
        control={control}
        errors={errors}
        options={reviewValidations.rating}
      />

      <InputArea
        label="Descripción"
        name="description"
        register={register}
        errors={errors}
        options={reviewValidations.description}
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
