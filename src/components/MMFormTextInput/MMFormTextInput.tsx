import { Input } from '@mui/material';
import { display, flexbox } from '@mui/system';
import { FieldError, FieldErrors, FieldValues, RegisterOptions, useForm, useFormContext, UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';
import "./MMFormTextInput.scss"

interface Props {
  label: string;
  name: string;
  type: string;
  options: RegisterOptions;
}

/**
 * 
 * This component must be wraped in a FormProvider from "react-hook-form" to work properly
 * 
 */
export const MMFormTextInput = (props: Props) => {
  const {register} = useFormContext();
  
  return (
    <>
      <div className='input-container'>
        <span className='input-title'>{props.label}</span>
        <input type={props.type.toString().toLowerCase()} {...register(props.name,props.options)} className="input-input"/>
      </div>
    </>
  );
};