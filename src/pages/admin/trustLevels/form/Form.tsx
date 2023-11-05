import './Form.scss';
import React, { SetStateAction, useState } from 'react';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { TrustLevel, trustLevelValidation } from '../../../../models/TrustLevel';
import { adminCreateTrustLevel, adminUpdateTrustLevel } from '../../../../services/trustLevelService';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputText } from '../../../../components/form/InputText/InputText';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { handleFormErrors } from '../../../../utils/handleFormErrors';
import { PermissionListInput } from '../../../../components/form/PermissionListInput/PermissionListInput';
import { useCollection } from '../../../../context/collectionContext';
import { Grid } from '@mui/material';
import { isAxiosError } from 'axios';

type FormData = {
  name: string;
  order: number;
  days_visited: number;
  viewed_events: number;
  likes_received: number;
  likes_given: number;
  comments_count: number;
};

type Props = {
  type: 'create' | 'update';
  trustLevel?: TrustLevel;
  setTrustLevel?: React.Dispatch<SetStateAction<TrustLevel | undefined>>;
  closeFormModal?: () => void;
  setTrustLevelList?: React.Dispatch<React.SetStateAction<TrustLevel[] | undefined>>;
  trustLevelList?: TrustLevel[] | undefined;
};
export const Form = ({ type, trustLevel, setTrustLevel, closeFormModal, setTrustLevelList, trustLevelList }: Props) => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(trustLevel ? trustLevel.permission_ids : []);
  const { addRoleToCollection, updateRoleInCollection } = useCollection();

  const preloadValues = {
    name: trustLevel?.name,
    order: trustLevel?.order,
    days_visited: trustLevel?.days_visited,
    viewed_events: trustLevel?.viewed_events,
    likes_received: trustLevel?.likes_received,
    likes_given: trustLevel?.likes_given,
    comments_count: trustLevel?.comments_count
  };
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({ defaultValues: preloadValues });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (type === 'create') {
        const response = await adminCreateTrustLevel(data, selectedPermissions);
        if (setTrustLevelList && trustLevelList) {
          setTrustLevelList((trustLevels) => [response, ...(trustLevels ? trustLevels : [])]);
        }
        addRoleToCollection(response);
        infoSnackbar('Nivel de confianza creado con exito');
        if (closeFormModal) closeFormModal();
      } else {
        if (!trustLevel) return;
        const response = await adminUpdateTrustLevel(trustLevel.id, data, selectedPermissions);
        response.permission_ids = selectedPermissions;
        if (setTrustLevel) setTrustLevel(response);
        updateRoleInCollection(response);
        infoSnackbar('Nivel de Confianza actualizado con exito');
        if (closeFormModal) closeFormModal();
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 403) {
        return errorSnackbar(
          `No tienes permisos para ${type === 'create' ? 'crear' : 'actualizar'} el nivel de confianza.`
        );
      }

      let hasFormError = handleFormErrors(error, setError);

      !hasFormError &&
        errorSnackbar(
          `Error inesperado al ${type === 'create' ? 'crear' : 'actualizar'} el nivel de confianza. Contacte a soporte.`
        );
    }
  };

  const inputCommonProps = { register, errors };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="trust-level-form">
      <div>
        <Grid container spacing={2}>
          <Grid item xl={4} md={6} xs={12}>
            <InputText
              label="Nombre"
              name="name"
              options={trustLevelValidation.name}
              {...inputCommonProps}
              type="text"
            />
          </Grid>
          <Grid item xl={4} md={6} xs={12}>
            <InputText
              label="Orden"
              name="order"
              options={trustLevelValidation.order}
              {...inputCommonProps}
              type="number"
            />
          </Grid>
        </Grid>
      </div>
      <h2>Requisitos</h2>
      <div>
        <Grid container spacing={2}>
          <Grid item xl={4} md={6} xs={12}>
            <InputText
              label="Dias Visitados"
              name="days_visited"
              options={trustLevelValidation.days_visited}
              {...inputCommonProps}
              type="number"
            />
          </Grid>
          <Grid item xl={4} md={6} xs={12}>
            <InputText
              label="Eventos Consultados"
              name="viewed_events"
              options={trustLevelValidation.viewed_events}
              {...inputCommonProps}
              type="number"
            />
          </Grid>
          <Grid item xl={4} md={6} xs={12}>
            <InputText
              label="Respuestas Creadas"
              name="comments_count"
              options={trustLevelValidation.comments_count}
              {...inputCommonProps}
              type="number"
            />
          </Grid>
          <Grid item xl={4} md={6} xs={12}>
            <InputText
              label="Me Gusta Recibidos"
              name="likes_received"
              options={trustLevelValidation.likes_received}
              {...inputCommonProps}
              type="number"
            />
          </Grid>
          <Grid item xl={4} md={6} xs={12}>
            <InputText
              label="Me Gusta Dados"
              name="likes_given"
              options={trustLevelValidation.likes_given}
              {...inputCommonProps}
              type="number"
            />
          </Grid>
        </Grid>
      </div>
      <PermissionListInput
        key={'ctrl'}
        disabled={false}
        selectedPermissions={selectedPermissions}
        setSelectedPermissions={setSelectedPermissions}
      />

      <div className="buttons-container">
        <MMButton color="primary" type="submit">
          {type === 'create' ? 'Crear' : 'Guardar'}
        </MMButton>
        <MMButton
          color="tertiary"
          type="button"
          onClick={() => {
            if (type === 'update') {
              if (!trustLevel) return;
              setSelectedPermissions(trustLevel?.permission_ids);
            }
            if (closeFormModal) closeFormModal();
          }}
        >
          Cancelar
        </MMButton>
      </div>
    </form>
  );
};

export default Form;
