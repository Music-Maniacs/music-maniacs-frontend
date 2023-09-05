import React, { useEffect, useState } from 'react';
import { SelectCollection } from '../../../models/Generic';
import { useCollection } from '../../../context/collectionContext';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Grid, GridProps } from '@mui/material';
import { errorSnackbar, infoSnackbar } from '../../Snackbar/Snackbar';
import { handleFormErrors } from '../../../utils/handleFormErrors';
import { Producer, producerValidations } from '../../../models/Producer';
import { InputDropzone } from '../../form/InputDropzone/InputDropzone';
import { InputText } from '../../form/InputText/InputText';
import { InputSelect } from '../../form/InputSelect/InputSelect';
import { LinksFieldArray } from '../../form/LinksFieldArray/LinksFieldArray';
import { InputArea } from '../../form/InputArea/InputArea';
import { StyledButtonGroup } from '../../../pages/admin/styles';
import { MMButton } from '../../MMButton/MMButton';
import { adminCreateProducer, adminUpdateProducer } from '../../../services/producerService';

type Props = {
  useAdminController?: boolean;
  producerToEdit?: Producer;
  isFormEdit?: boolean;
  closeFormModal: () => void;
  successCallback?: (producer: Producer) => void;
};

type FormData = {
  name: string;
  nationality: SelectCollection;
  description: string;
  genres: SelectCollection[];
  links_attributes: {
    title: string;
    url: string;
  }[];
  image?: File;
};

export const ProducerForm = ({
  useAdminController = false,
  producerToEdit,
  isFormEdit,
  closeFormModal,
  successCallback
}: Props) => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const [genresCollection, setGenresCollection] = useState<SelectCollection[]>([]);

  const { getGenresCollection, nationalitiesCollection } = useCollection();

  const {
    register,
    control,
    handleSubmit,
    setError,
    reset,
    getValues,
    formState: { errors }
  } = useForm<FormData>();

  const { fields, append, remove, update } = useFieldArray<FormData, 'links_attributes', 'id'>({
    control,
    name: 'links_attributes'
  });

  useEffect(() => {
    getGenresCollection().then((genres) => setGenresCollection(genres));

    if (isFormEdit && producerToEdit) {
      reset({
        name: producerToEdit.name,
        description: producerToEdit.description,
        nationality: { value: producerToEdit.nationality, label: producerToEdit.nationality },
        genres: producerToEdit.genres.map((genre) => ({ value: genre.id, label: genre.name })),
        links_attributes: producerToEdit.links.map((link) => ({ id: link.id, title: link.title, url: link.url }))
      });
    } else {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormEdit, producerToEdit]);

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
      // todo: cuando tengamos el controlador de productora, usar la prop para ver que endpoint usar
      let producer: Producer;

      if (isFormEdit && producerToEdit) {
        producer = await adminUpdateProducer(
          producerToEdit.id,
          data.name,
          data.nationality.value,
          data.description,
          data.genres?.map((genre) => genre.value) ?? [],
          data.links_attributes,
          data.image
        );
      } else {
        producer = await adminCreateProducer(
          data.name,
          data.nationality.value,
          data.description,
          data.genres?.map((genre) => genre.value) ?? [],
          data.links_attributes,
          data.image
        );
      }

      infoSnackbar(`Productora ${isFormEdit ? 'actualizada' : 'creada'} con éxito.`);

      successCallback && successCallback(producer);

      closeFormModal();
    } catch (error) {
      let hasFormError = handleFormErrors(error, setError);

      !hasFormError &&
        errorSnackbar(`Error inesperado al ${isFormEdit ? 'actualizar' : 'crear'} la productora. Contacte a soporte.`);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="admin-form-container">
      <Grid container spacing={2}>
        <Grid {...gridCommonProps}>
          <InputDropzone
            label="Portada de la Productora"
            name="image"
            control={control}
            errors={errors}
            previewImageUrl={producerToEdit?.image?.url ? `${backendUrl}${producerToEdit.image.url}` : ''}
            acceptedFileTypes={{ 'image/*': ['.png', '.jpeg', '.jpg'] }}
          />
        </Grid>
        <Grid {...gridCommonProps}>
          <InputText label="Nombre" name="name" options={producerValidations.name} {...inputCommonProps} />

          <InputSelect
            label="Nacionalidad"
            name="nationality"
            control={control}
            errors={errors}
            collection={nationalitiesCollection}
            isClearable={true}
            options={producerValidations.nationality}
          />

          <InputSelect
            label="Generos Relacionados"
            name="genres"
            control={control}
            errors={errors}
            collection={genresCollection}
            isClearable={true}
            isMultiSelect={true}
          />

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

        <Grid {...gridCommonProps}>
          <InputArea
            label="Descripción"
            name="description"
            register={register}
            errors={errors}
            options={producerValidations.description}
            rows={12}
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
