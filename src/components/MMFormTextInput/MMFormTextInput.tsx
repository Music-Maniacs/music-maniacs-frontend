import { HTMLInputTypeAttribute } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import './MMFormTextInput.scss';

interface Props {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  options: RegisterOptions;
}

/**
 *
 * This component must be wrapped in a FormProvider from "react-hook-form" to work properly
 *
 */
export const MMFormTextInput = (props: Props) => {
  const { register } = useFormContext();

  return (
    <>
      <div className="input-container">
        <label className="input-title">{props.label}</label>
        <input type={props.type} {...register(props.name, props.options)} className="input-input" />
      </div>
    </>
  );
};
