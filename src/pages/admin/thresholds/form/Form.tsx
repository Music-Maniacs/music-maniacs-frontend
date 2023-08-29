import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { InputText } from '../../../../components/form/InputText/InputText';
import { StyledButtonGroup } from '../../styles';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { handleFormErrors } from '../../../../utils/handleFormErrors';

import { Threshold, thresholdValidations } from '../../../../models/Threshold';
import { useThreshold } from '../context/ThresholdProvider';

export const Form = () => {
  const { dispatch, isModalOpen, closeModal } = useThreshold();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<Threshold>();

  useEffect(() => {}, [isModalOpen]);

  const inputCommonProps = { register, errors, type: 'text' };

  const onSubmit: SubmitHandler<Threshold> = async (threshold) => {
    try {
      await dispatch({ type: 'remove_threshold', payload: threshold });
      infoSnackbar('Umbral creado con exito');
      closeModal();
    } catch (error) {
      let hasFormError = handleFormErrors(error, setError);
      !hasFormError && errorSnackbar('Error inesperado al crear umbral. Contacte a soporte.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="admin-form-container">
      <InputText label="Cantidad de penalizaciones" name="name" options={thresholdValidations.penalty_score} {...inputCommonProps} />
      <InputText label="Dias bloqueados" name="name" options={thresholdValidations.days_blocked} {...inputCommonProps} />
      <input type="submit" hidden />
      <StyledButtonGroup>
        <MMButton type="submit" color="primary">
          Crear
        </MMButton>
        <MMButton type="button" color="tertiary" onClick={closeModal}>
          Cerrar
        </MMButton>
      </StyledButtonGroup>
    </form>
  );
};
