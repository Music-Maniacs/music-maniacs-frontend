import { useState } from 'react';
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
import { Accept, useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';
import colors from '../../../styles/_colors.scss';
import { MMButton } from '../../MMButton/MMButton';
import { errorSnackbar } from '../../Snackbar/Snackbar';
import { useModal } from '../../hooks/useModal';
import { MMModal } from '../../Modal/MMModal';
import { Loader } from '../../Loader/Loader';
import { ImageCropper } from './ImageCropper';

interface Props {
  name: string;
  label?: string;
  options?: RegisterOptions;
  control: Control<any>;
  errors: FieldErrors<any>;
  containerWidth?: string;
  previewImageUrl?: string;
  acceptedFileTypes?: Accept;
  type?: 'profile' | 'cover';
  width?: string;
}

export const InputDropzone = ({
  name,
  label,
  options,
  control,
  errors,
  previewImageUrl,
  acceptedFileTypes,
  containerWidth = '100%',
  type,
  width
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
              acceptedFileTypes={acceptedFileTypes}
              type={type}
              width={width}
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
  type?: 'profile' | 'cover';
  width?: string;
};

const Dropzone = ({ onChange, previewImageUrl, acceptedFileTypes, type, width, ...props }: DropzoneProps) => {
  const { closeModal, openModal, isModalOpen } = useModal();
  const [preview, setPreview] = useState<string | undefined>(previewImageUrl);
  const [image, setImage] = useState<File>();
  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptedFileTypes,
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        errorSnackbar('El tipo de archivo no es válido');
      }
      if (acceptedFiles.length > 0) {
        if (type !== undefined) {
          setImage(acceptedFiles[0]);
          openModal();
        } else {
          setPreview(URL.createObjectURL(acceptedFiles[0]));
          onChange(acceptedFiles);
        }
      }
    },
    ...props
  });

  return (
    <>
      {preview && (
        <StyledDropzoneImagePreviewContainer>
          <StyledDropzoneImagePreview $type={type} $width={width} src={preview} />
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
      {type && (
        <MMModal title="Recortar Imagen" isModalOpen={isModalOpen} closeModal={closeModal} maxWidth="lg">
          <>
            <div>
              {image ? (
                <ImageCropper
                  image={image}
                  setImage={setPreview}
                  closeModal={closeModal}
                  type={type === 'cover' ? 'cover' : 'profile'}
                  onChange={onChange}
                />
              ) : (
                <Loader />
              )}
            </div>
          </>
        </MMModal>
      )}
    </>
  );
};
