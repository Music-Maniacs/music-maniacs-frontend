import React, { useEffect } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { Control, Controller, FieldErrors, RegisterOptions, UseFormSetValue } from 'react-hook-form';
import {
  StyledDropzoneBox,
  StyledDropzoneContainer,
  StyledError,
  StyledInputContainer,
  StyledLabel
} from '../../../../components/form/formStyles';
import { FaCloudUploadAlt } from 'react-icons/fa';
import colors from '../../../../styles/_colors.scss';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import moment from 'moment';

interface Props {
  name: string;
  label: string;
  options?: RegisterOptions;
  control: Control<any>;
  errors: FieldErrors<any>;
  containerWidth?: string;
  previewImageUrl?: string;
  acceptedFileTypes?: Accept;
  setValue: UseFormSetValue<any>;
}

export const VideoDropzone = ({
  name,
  label,
  options,
  control,
  errors,
  previewImageUrl,
  acceptedFileTypes,
  containerWidth = '100%',
  setValue
}: Props) => {
  const hasErrors = !!errors?.[`${name}`];

  return (
    <StyledInputContainer $containerWidth={containerWidth}>
      <StyledLabel>{label}</StyledLabel>

      <Controller
        name={name}
        control={control}
        rules={options}
        render={({ field: { onChange }, ...props }) => {
          return (
            <Dropzone
              onChange={(acceptedFiles) => {
                if (acceptedFiles[0]) {
                  acceptedFiles[0].name && setValue('name', acceptedFiles[0].name);

                  // @ts-ignore
                  acceptedFiles[0].lastModifiedDate &&
                    // @ts-ignore
                    setValue('recorded_at', moment(acceptedFiles[0].lastModifiedDate).format('YYYY-MM-DDThh:mm'));
                }
                onChange(acceptedFiles[0]);
              }}
              previewImageUrl={previewImageUrl}
              acceptedFileTypes={acceptedFileTypes}
              {...props}
            />
          );
        }}
      />

      {hasErrors && <StyledError>{errors[`${name}`]?.message?.toString()}</StyledError>}
    </StyledInputContainer>
  );
};

type DropzoneProps = {
  onChange: (acceptedFiles: File[]) => void;
  previewImageUrl?: string;
  [x: string]: unknown;
  acceptedFileTypes?: Accept;
};

const Dropzone = ({ onChange, previewImageUrl, acceptedFileTypes, ...props }: DropzoneProps) => {
  const [acceptedFile, setAcceptedFile] = React.useState<string | undefined>();
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptedFileTypes,
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        errorSnackbar('El tipo de archivo no es válido');
      }
      if (acceptedFiles.length > 0) {
        setAcceptedFile(URL.createObjectURL(acceptedFiles[0]));

        onChange(acceptedFiles);
      }
    },
    ...props
  });

  useEffect(() => {
    if (acceptedFile && videoRef.current) {
      videoRef.current.load();
    }
  }, [acceptedFile]);

  return (
    <>
      {acceptedFile && (
        <div className="video-container">
          <video ref={videoRef} className="video" controls>
            <source src={acceptedFile} />
          </video>
        </div>
      )}

      <StyledDropzoneContainer {...getRootProps()}>
        {!acceptedFile && (
          <StyledDropzoneBox>
            <FaCloudUploadAlt color={colors.primary} size={'4rem'} />
            Subir Video
          </StyledDropzoneBox>
        )}

        <MMButton type="button" color="primary">
          {acceptedFile ? 'Modificar Video' : 'Subir Video'}
        </MMButton>
        <input {...getInputProps()} />
      </StyledDropzoneContainer>
    </>
  );
};
