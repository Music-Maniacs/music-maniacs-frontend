import { DetailedHTMLProps, HTMLInputTypeAttribute, InputHTMLAttributes, RefObject } from 'react';
import { FieldErrors, RegisterOptions, UseFormGetFieldState, UseFormRegister } from 'react-hook-form';
import { StyledError, StyledInput, StyledInputContainer, StyledLabel } from '../formStyles';
import { ErrorMessage } from '@hookform/error-message';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name?: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  options?: RegisterOptions;
  register?: UseFormRegister<any>;
  errors?: FieldErrors<any>;
  containerWidth?: string;
  inputRef?: RefObject<HTMLInputElement>;
  getFieldState?: UseFormGetFieldState<any>;
}

export const InputText = ({
  label,
  name,
  options,
  type = 'text',
  register,
  errors,
  containerWidth,
  inputRef,
  getFieldState,
  ...props
}: Props) => {
  let hasErrors = false;
  if (getFieldState && name) {
    hasErrors = getFieldState(name).invalid;
  } else {
    // Deberiamos usar en getFieldState siempre, ahora lo dejo asi para que no se rompan los anteriores
    hasErrors = !!errors?.[`${name}`];
  }

  return (
    <StyledInputContainer $containerWidth={containerWidth}>
      {label && <StyledLabel>{label}</StyledLabel>}

      <StyledInput
        ref={inputRef}
        type={type}
        {...(register && name && register(name, options))}
        $hasErrors={hasErrors}
        {...props}
      />

      {errors && name && (
        <ErrorMessage errors={errors} name={name} render={({ message }) => <StyledError>{message}</StyledError>} />
      )}
    </StyledInputContainer>
  );
};
