import { RegisterOptions } from 'react-hook-form';

export type ModelValidations<T> = {
  readonly [Key in keyof T]?: RegisterOptions;
};
