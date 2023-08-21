import { DetailedHTMLProps, HTMLInputTypeAttribute, InputHTMLAttributes, RefObject } from 'react';
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { StyledError, StyledInput, StyledInputContainer, StyledLabel } from '../formStyles';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name?: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  options?: RegisterOptions;
  register?: UseFormRegister<any>;
  errors?: FieldErrors<any>;
  containerWidth?: string;
  inputRef?: RefObject<HTMLInputElement>;
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
  ...props
}: Props) => {
  const hasErrors = !!errors?.[`${name}`];

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

      {hasErrors && <StyledError>{errors[`${name}`]?.message?.toString()}</StyledError>}
    </StyledInputContainer>
  );
};
