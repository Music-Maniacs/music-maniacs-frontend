import { HTMLInputTypeAttribute } from 'react';
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { StyledError, StyledInput, StyledLabel } from '../formStyles';
import { styled } from 'styled-components';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  options?: RegisterOptions;
  register?: UseFormRegister<any>;
  errors?: FieldErrors<any>;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const InputText = ({ label, name, options, type = 'text', register, errors, ...props }: Props) => {
  const hasErrors = !!errors?.[`${name}`];

  return (
    <InputContainer>
      {label && <StyledLabel>{label}</StyledLabel>}

      <StyledInput type={type} {...(register && name && register(name, options))} $hasErrors={hasErrors} {...props} />

      {hasErrors && <StyledError>{errors[`${name}`]?.message?.toString()}</StyledError>}
    </InputContainer>
  );
};
