import React, { useEffect } from 'react';
import { Event, eventValidations } from '../../../models/Event';
import { SelectCollection } from '../../../models/Generic';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { adminCreateEvent, adminUpdateEvent, createEvent, updateEvent } from '../../../services/eventService';
import { errorSnackbar, infoSnackbar } from '../../Snackbar/Snackbar';
import { handleFormErrors } from '../../../utils/handleFormErrors';
import { Grid, GridProps } from '@mui/material';
import { InputDropzone } from '../../form/InputDropzone/InputDropzone';
import { InputText } from '../../form/InputText/InputText';
import { LinksFieldArray } from '../../form/LinksFieldArray/LinksFieldArray';
import { InputArea } from '../../form/InputArea/InputArea';
import { StyledButtonGroup } from '../../../pages/admin/styles';
import { MMButton } from '../../MMButton/MMButton';
import { InputAsyncSelect } from '../../form/InputAsyncSelect/InputAsyncSelect';
import { InputDate } from '../../form/InputDate/InputDate';
import moment from 'moment';

type Props = {
  useAdminController?: boolean;
  eventToEdit?: Event;
  isFormEdit?: boolean;
  closeFormModal: () => void;
  successCallback?: (event: Event) => void;
};

type FormData = {
  name: string;
  datetime: string;
  artist: SelectCollection;
  producer: SelectCollection;
  venue: SelectCollection;
  description: string;
  links_attributes: {
    title: string;
    url: string;
  }[];
  image?: File;
};

export const EventsForm = ({
  useAdminController = false,
  eventToEdit,
  isFormEdit,
  closeFormModal,
  successCallback
}: Props) => {
  const isShowEdit = !useAdminController && isFormEdit;

  const {
    register,
    control,
    handleSubmit,
    setError,
    reset,
    getValues,
    getFieldState,
    formState: { errors }
  } = useForm<FormData>();

  const { fields, append, remove, update } = useFieldArray<FormData, 'links_attributes', 'id'>({
    control,
    name: 'links_attributes'
  });

  useEffect(() => {
    if (isFormEdit && eventToEdit) {
      reset({
        name: eventToEdit.name,
        datetime: moment(eventToEdit.datetime).format('YYYY-MM-DDTkk:mm'),
        description: eventToEdit.description,
        artist: { value: eventToEdit.artist.id, label: eventToEdit.artist.name },
        venue: { value: eventToEdit.venue.id, label: eventToEdit.venue.name },
        producer: { value: eventToEdit.producer.id, label: eventToEdit.producer.name },
        links_attributes: eventToEdit.links.map((link) => ({ id: link.id, title: link.title, url: link.url }))
      });
    } else {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormEdit, eventToEdit]);

  const inputCommonProps = { register, errors, type: 'text' };

  const gridCommonProps: GridProps = {
    item: true,
    xs: 12,
    sm: 12,
    md: 4,
    lg: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      let event: Event;
      data.name = data.name !== '' ? data.name : `${data.artist.label} - ${data.venue.label}`;
      if (isFormEdit && eventToEdit) {
        const updateService = useAdminController ? adminUpdateEvent : updateEvent;
        event = await updateService(
          eventToEdit.id,
          data.name,
          data.datetime,
          data.description,
          data.artist.value,
          data.venue.value,
          data.producer.value,
          data.links_attributes,
          data.image
        );
      } else {
        const createService = useAdminController ? adminCreateEvent : createEvent;

        event = await createService(
          data.name,
          data.datetime,
          data.description,
          data.artist.value,
          data.venue.value,
          data.producer.value,
          data.links_attributes,
          data.image
        );
      }

      infoSnackbar(`Evento ${isFormEdit ? 'actualizado' : 'creado'} con éxito.`);

      successCallback && successCallback(event);

      closeFormModal();
    } catch (error) {
      let hasFormError = handleFormErrors(error, setError);

      !hasFormError &&
        errorSnackbar(`Error inesperado al ${isFormEdit ? 'actualizar' : 'crear'} el event. Contacte a soporte.`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="admin-form-container">
      <Grid container spacing={2}>
        <Grid {...gridCommonProps}>
          <InputDropzone
            label="Portada del Evento"
            name="image"
            control={control}
            errors={errors}
            previewImageUrl={eventToEdit?.image?.full_url ?? ''}
            acceptedFileTypes={{ 'image/*': ['.png', '.jpeg', '.jpg'] }}
          />
        </Grid>
        <Grid {...gridCommonProps}>
          <InputText label="Nombre" name="name" options={eventValidations.name} {...inputCommonProps} />

          <InputDate
            label="Fecha y Hora"
            name="datetime"
            options={eventValidations.datetime}
            type="datetime-local"
            register={register}
            errors={errors}
            getFieldState={getFieldState}
          />

          {!isShowEdit ? (
            <>
              <InputAsyncSelect
                label="Artista"
                name="artist"
                control={control}
                errors={errors}
                getFieldState={getFieldState}
                typeaheadUrl="/admin/artists/search_typeahead?q[name_cont]="
                options={eventValidations.artist}
              />

              <InputAsyncSelect
                label="Productora"
                name="producer"
                control={control}
                errors={errors}
                getFieldState={getFieldState}
                typeaheadUrl="/admin/producers/search_typeahead?q[name_cont]="
                options={eventValidations.producer}
              />

              <InputAsyncSelect
                label="Espacio de Evento"
                name="venue"
                control={control}
                errors={errors}
                getFieldState={getFieldState}
                typeaheadUrl="/admin/venues/search_typeahead?q[name_cont]="
                options={eventValidations.venue}
              />
            </>
          ) : (
            <LinksFieldArray<FormData>
              register={register}
              errors={errors}
              fields={fields}
              append={append}
              update={update}
              remove={remove}
              getValues={getValues}
            />
          )}
        </Grid>

        <Grid {...gridCommonProps}>
          <InputArea
            label="Descripción"
            name="description"
            register={register}
            errors={errors}
            options={eventValidations.description}
            rows={!isShowEdit ? 8 : 10}
          />

          {!isShowEdit && (
            <LinksFieldArray<FormData>
              register={register}
              errors={errors}
              fields={fields}
              append={append}
              update={update}
              remove={remove}
              getValues={getValues}
            />
          )}
        </Grid>
      </Grid>

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
