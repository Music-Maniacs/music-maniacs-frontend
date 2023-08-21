import React from 'react';
import { StyledError, StyledInputContainer, StyledLabel, StyledTextArea } from '../formStyles';
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name?: string;
  label?: string;
  options?: RegisterOptions;
  register?: UseFormRegister<any>;
  errors?: FieldErrors<any>;
  containerWidth?: string;
}

export const InputArea = ({ name, label, register, errors, options, containerWidth, rows = 3, ...props }: Props) => {
  const hasErrors = !!errors?.[`${name}`];

  return (
    <StyledInputContainer $containerWidth={containerWidth}>
      {label && <StyledLabel>{label}</StyledLabel>}

      <StyledTextArea
        as={'textarea'}
        $hasErrors={hasErrors}
        rows={rows}
        {...(register && name && register(name, options))}
        {...props}
      />

      {hasErrors && <StyledError>{errors[`${name}`]?.message?.toString()}</StyledError>}
    </StyledInputContainer>
  );
};
