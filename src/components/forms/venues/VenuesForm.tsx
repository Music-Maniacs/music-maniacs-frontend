import React, { useEffect } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Grid, GridProps } from '@mui/material';
import { errorSnackbar, infoSnackbar } from '../../Snackbar/Snackbar';
import { handleFormErrors } from '../../../utils/handleFormErrors';
import { InputDropzone } from '../../form/InputDropzone/InputDropzone';
import { InputText } from '../../form/InputText/InputText';
import { LinksFieldArray } from '../../form/LinksFieldArray/LinksFieldArray';
import { InputArea } from '../../form/InputArea/InputArea';
import { StyledButtonGroup } from '../../../pages/admin/styles';
import { MMButton } from '../../MMButton/MMButton';
import { Venue, venueValidations } from '../../../models/Venue';
import { adminCreateVenue, adminUpdateVenue } from '../../../services/venueService';
import { locationValidations } from '../../../models/Location';
import { LeafletMap } from './LeafletMap';

type Props = {
  useAdminController?: boolean;
  venueToEdit?: Venue;
  isFormEdit?: boolean;
  closeFormModal: () => void;
  successCallback?: (venue: Venue) => void;
};

type FormData = {
  name: string;
  description: string;
  location_attributes: {
    id: string;
    zip_code: string;
    street: string;
    department: string;
    locality: string;
    latitude?: number;
    longitude?: number;
    number: number;
    country: string;
    province: string;
  };
  links_attributes: {
    title: string;
    url: string;
  }[];
  image?: File;
};

export const VenuesForm = ({
  useAdminController = false,
  venueToEdit,
  isFormEdit,
  closeFormModal,
  successCallback
}: Props) => {
  const backendUrl = process.env.REACT_APP_API_URL;

  const {
    register,
    control,
    handleSubmit,
    setError,
    reset,
    getValues,
    setValue,
    formState: { errors }
  } = useForm<FormData>();

  const latitudeValue = getValues('location_attributes.latitude');
  const longitudeValue = getValues('location_attributes.longitude');

  const setLatLng = (latitude?: number, longitude?: number) => {
    setValue('location_attributes.latitude', latitude);
    setValue('location_attributes.longitude', longitude);
  };

  const { fields, append, remove, update } = useFieldArray<FormData, 'links_attributes', 'id'>({
    control,
    name: 'links_attributes'
  });

  useEffect(() => {
    if (isFormEdit && venueToEdit) {
      reset({
        name: venueToEdit.name,
        description: venueToEdit.description,
        location_attributes: {
          ...venueToEdit.location,
          latitude: venueToEdit.location?.latitude ? parseFloat(venueToEdit.location.latitude) : 0,
          longitude: venueToEdit.location?.longitude ? parseFloat(venueToEdit.location.longitude) : 0
        },
        links_attributes: venueToEdit.links.map((link) => ({ id: link.id, title: link.title, url: link.url }))
      });
    } else {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormEdit, venueToEdit]);

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

  const gridMapProps: GridProps = {
    item: true,
    xs: 12,
    sm: 12,
    md: 6,
    lg: 6,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // todo: cuando tengamos el controlador de productoras, usar la prop para ver que endpoint usar
      let venue: Venue;

      if (isFormEdit && venueToEdit) {
        venue = await adminUpdateVenue(
          venueToEdit.id,
          data.name,
          data.description,
          {
            ...data.location_attributes,
            latitude: data.location_attributes?.latitude ? data.location_attributes.latitude.toString() : '',
            longitude: data.location_attributes?.longitude ? data.location_attributes.longitude.toString() : ''
          },
          data.links_attributes,
          data.image
        );
      } else {
        venue = await adminCreateVenue(
          data.name,
          data.description,
          {
            ...data.location_attributes,
            latitude: data.location_attributes?.latitude ? data.location_attributes.latitude.toString() : '',
            longitude: data.location_attributes?.longitude ? data.location_attributes.longitude.toString() : ''
          },
          data.links_attributes,
          data.image
        );
      }

      infoSnackbar(`Espacio de Evento ${isFormEdit ? 'actualizado' : 'creado'} con éxito.`);

      successCallback && successCallback(venue);

      closeFormModal();
    } catch (error) {
      let hasFormError = handleFormErrors(error, setError);

      !hasFormError &&
        errorSnackbar(
          `Error inesperado al ${isFormEdit ? 'actualizar' : 'crear'} el espacio de eventos. Contacte a soporte.`
        );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="admin-form-container">
      {/* Basic Data */}
      <Grid container spacing={2}>
        <Grid {...gridCommonProps}>
          <InputDropzone
            label="Portada del Espacio de Eventos"
            name="image"
            control={control}
            errors={errors}
            previewImageUrl={venueToEdit?.image?.url ? `${backendUrl}${venueToEdit.image.url}` : ''}
            acceptedFileTypes={{ 'image/*': ['.png', '.jpeg', '.jpg'] }}
          />
        </Grid>
        <Grid {...gridCommonProps}>
          <InputText label="Nombre" name="name" options={venueValidations.name} {...inputCommonProps} />

          <InputArea
            label="Descripción"
            name="description"
            register={register}
            errors={errors}
            options={venueValidations.description}
            rows={4}
          />
        </Grid>

        <Grid {...gridCommonProps}>
          <LinksFieldArray<FormData>
            register={register}
            errors={errors}
            fields={fields}
            append={append}
            update={update}
            remove={remove}
            getValues={getValues}
          />
        </Grid>
      </Grid>

      <br />

      {/* Location Data */}
      <Grid container spacing={2}>
        <Grid {...gridMapProps}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputText
                label="Latitud"
                name="location_attributes.latitude"
                options={locationValidations.latitude}
                {...inputCommonProps}
              />
            </Grid>
            <Grid item xs={6}>
              <InputText
                label="Longitud"
                name="location_attributes.longitude"
                options={locationValidations.longitude}
                {...inputCommonProps}
              />
            </Grid>
          </Grid>

          <LeafletMap latitude={latitudeValue} longitude={longitudeValue} setLatLng={setLatLng} />
        </Grid>
        <Grid {...gridMapProps}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <InputText
                label="Calle"
                name="location_attributes.street"
                options={locationValidations.street}
                {...inputCommonProps}
              />
            </Grid>
            <Grid item xs={4}>
              <InputText
                label="Número"
                name="location_attributes.number"
                options={locationValidations.number}
                type="number"
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>

          <InputText
            label="Código Postal"
            name="location_attributes.zip_code"
            options={locationValidations.zip_code}
            {...inputCommonProps}
          />

          <InputText
            label="Departamento"
            name="location_attributes.department"
            options={locationValidations.department}
            {...inputCommonProps}
          />

          <InputText
            label="Localidad"
            name="location_attributes.locality"
            options={locationValidations.locality}
            {...inputCommonProps}
          />

          <InputText
            label="Provincia"
            name="location_attributes.province"
            options={locationValidations.province}
            {...inputCommonProps}
          />

          <InputText
            label="Pais"
            name="location_attributes.country"
            options={locationValidations.country}
            {...inputCommonProps}
          />
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
