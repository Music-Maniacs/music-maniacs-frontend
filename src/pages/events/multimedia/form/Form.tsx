import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { handleFormErrors } from '../../../../utils/handleFormErrors';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { StyledFlex } from '../../../../styles/styledComponents';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { InputText } from '../../../../components/form/InputText/InputText';
import { Video, videoValidations } from '../../../../models/Video';
import { VideoDropzone } from './VideoDropzone';
import { InputDate } from '../../../../components/form/InputDate/InputDate';
import { uploadVideo } from '../../../../services/eventService';
import '../Multimedia.scss';
import { isAxiosError } from 'axios';
import { DirectUpload } from '@rails/activestorage';

type FormProps = {
  eventId: string;
  successCallback: (video: Video) => void;
  closeFormModal: () => void;
};

type FormData = {
  name: string;
  recorded_at: string;
  video: File;
};

export const Form = ({ eventId, successCallback, closeFormModal }: FormProps) => {
  const {
    register,
    control,
    handleSubmit,
    setError,
    getFieldState,
    setValue,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // your form needs the file_field direct_upload: true, which
      //  provides data-direct-upload-url
      const url = `${process.env.REACT_APP_API_URL}/rails/active_storage/direct_uploads`;
      const upload = new DirectUpload(data.video, url)
      
      var signed_id = await new Promise<string>((resolve, reject) => {
        upload.create((error, blob) => {
          if (error) {
            reject(error);
          } else {
            resolve(blob.signed_id);
          }
        });
      });
  
      const response = await uploadVideo(eventId, data.name, signed_id, data.recorded_at);

      infoSnackbar(`Video subido con éxito.`);

      successCallback(response);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 403) {
        errorSnackbar('No tienes permisos para realizar esta acción');

        return closeFormModal();
      }

      let hasFormError = handleFormErrors(error, setError);

      !hasFormError && errorSnackbar(`Error inesperado al subir video. Contacte a soporte.`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="multimedia-form-container">
      <VideoDropzone label="Video" name="video" control={control} errors={errors} setValue={setValue} />

      <InputText label="Título" name="name" options={videoValidations.name} register={register} />

      <InputDate
        label="Fecha de Grabación"
        name="recorded_at"
        register={register}
        errors={errors}
        getFieldState={getFieldState}
      />

      <StyledFlex $justifyContent="flex-end">
        <MMButton type="submit" color="primary">
          Subir Video
        </MMButton>
        <MMButton type="button" color="tertiary" onClick={closeFormModal}>
          Cerrar
        </MMButton>
      </StyledFlex>
    </form>
  );
};
