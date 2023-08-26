import React, { useState } from 'react';
import { Control, Controller, FieldErrors, RegisterOptions } from 'react-hook-form';
import {
  StyledDropzoneBox,
  StyledDropzoneContainer,
  StyledDropzoneImagePreview,
  StyledDropzoneImagePreviewContainer,
  StyledError,
  StyledInputContainer,
  StyledLabel
} from '../formStyles';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';
import colors from '../../../styles/_colors.scss';
import { MMButton } from '../../MMButton/MMButton';

interface Props {
  name: string;
  label?: string;
  options?: RegisterOptions;
  control: Control<any>;
  errors: FieldErrors<any>;
  containerWidth?: string;
  previewImageUrl?: string;
}

export const InputDropzone = ({
  name,
  label,
  options,
  control,
  errors,
  previewImageUrl,
  containerWidth = '100%'
}: Props) => {
  const hasErrors = !!errors?.[`${name}`];

  return (
    <StyledInputContainer $containerWidth={containerWidth}>
      {label && <StyledLabel>{label}</StyledLabel>}

      <Controller
        name={name}
        control={control}
        rules={options}
        render={({ field: { onChange }, ...props }) => {
          return (
            <Dropzone
              onChange={(acceptedFiles) => {
                onChange(acceptedFiles[0]);
              }}
              previewImageUrl={previewImageUrl}
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
};

const Dropzone = ({ onChange, previewImageUrl, ...props }: DropzoneProps) => {
  const [preview, setPreview] = useState<string | undefined>(previewImageUrl);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setPreview(URL.createObjectURL(acceptedFiles[0]));
      onChange(acceptedFiles);
    },
    ...props
  });

  return (
    <>
      {preview && (
        <StyledDropzoneImagePreviewContainer>
          <StyledDropzoneImagePreview src={preview} />
        </StyledDropzoneImagePreviewContainer>
      )}
      <StyledDropzoneContainer {...getRootProps()}>
        {!preview && (
          <StyledDropzoneBox>
            <FaCloudUploadAlt color={colors.primary} size={'4rem'} />
            Subir Imagen
          </StyledDropzoneBox>
        )}

        <MMButton type="button" color="primary">
          {preview ? 'Modificar Imagen' : 'Subir Imagen'}
        </MMButton>
        <input {...getInputProps()} />
      </StyledDropzoneContainer>
    </>
  );
};
