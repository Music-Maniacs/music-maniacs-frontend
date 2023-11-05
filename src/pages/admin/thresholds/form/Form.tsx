import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { InputText } from '../../../../components/form/InputText/InputText';
import { StyledButtonGroup } from '../../styles';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { handleFormErrors } from '../../../../utils/handleFormErrors';
import { Threshold, thresholdValidations } from '../../../../models/Threshold';
import { useThreshold } from '../context/ThresholdProvider';
import { createThreshold, updateThreshold } from '../../../../services/thresholdService';
import { isAxiosError } from 'axios';

export const Form = () => {
  const { dispatch, isModalOpen, closeModal, threshold } = useThreshold();
  const [permanentBlock, setPermanentBlock] = useState<boolean | undefined>(threshold?.permanent_block);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors }
  } = useForm<Threshold>();

  useEffect(() => {
    if (threshold) {
      reset({
        penalty_score: threshold.penalty_score,
        days_blocked: threshold.days_blocked,
        permanent_block: threshold.permanent_block
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  const inputCommonProps = { register, errors, type: 'text' };

  const onSubmit: SubmitHandler<Threshold> = (thresholdData) => {
    let promise;
    if (threshold) {
      promise = updateThreshold({ ...threshold, ...thresholdData });
    } else {
      promise = createThreshold(thresholdData);
    }
    promise
      .then((newThreshold) => {
        if (threshold) {
          dispatch({ type: 'update_threshold', payload: newThreshold });
        } else {
          dispatch({ type: 'add_threshold', payload: newThreshold });
        }
        infoSnackbar(`Umbral ${threshold ? 'editado' : 'creado'} con exito`);
        closeModal();
      })
      .catch((error) => {
        if (isAxiosError(error) && error.response?.status === 403) {
          return errorSnackbar(`No tienes permisos para ${threshold ? 'editar' : 'crear'} umbrales`);
        }

        let hasFormError = handleFormErrors(error, setError);
        !hasFormError &&
          errorSnackbar(`Error inesperado al ${threshold ? 'editar' : 'crear'} umbral. Contacte a soporte.`);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="admin-form-container"
      style={{ alignItems: 'stretch' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ width: '100%', marginRight: '10px' }}>
          <InputText
            label="Cantidad de penalizaciones"
            name="penalty_score"
            options={thresholdValidations.penalty_score}
            {...inputCommonProps}
          />
        </div>
        <div style={{ width: '100%', marginLeft: '10px' }}>
          <InputText
            label="Dias bloqueados"
            name="days_blocked"
            options={thresholdValidations.days_blocked}
            {...inputCommonProps}
            disabled={!!permanentBlock}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '10px' }}>
        <label htmlFor="permanent_block">Permanente</label>
        <input
          type="checkbox"
          checked={permanentBlock}
          onChange={() => {
            if (!permanentBlock) {
              setValue('days_blocked', 365 * 100);
            } else {
              setValue('days_blocked', undefined);
            }
            setPermanentBlock(!permanentBlock);
          }}
        />
      </div>
      <input type="submit" hidden />
      <StyledButtonGroup>
        <MMButton type="submit" color="primary">
          {threshold ? 'Editar' : 'Crear'}
        </MMButton>
        <MMButton type="button" color="tertiary" onClick={closeModal}>
          Cerrar
        </MMButton>
      </StyledButtonGroup>
    </form>
  );
};
