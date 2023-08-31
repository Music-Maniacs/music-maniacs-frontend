import { ModelValidations } from './Generic';

export interface Threshold {
  id?: string;
  penalty_score: number;
  days_blocked: number | undefined | string;
  created_at?: string;
  updated_at?: string;
  permanent_block?: boolean;
}

export const thresholdValidations: Readonly<ModelValidations<Threshold>> = {
  penalty_score: {
    required: {
      value: true,
      message: 'Debe ingresar la cantidad de penalizaciones'
    },
    min: {
      value: 1,
      message: 'Debe ingresar un valor mayor a 0'
    },
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Debe ingresar un número'
    }
  },
  days_blocked: {
    required: {
      value: true,
      message: 'Debe ingresar la cantidad de dias bloqueados'
    },
    min: {
      value: 1,
      message: 'Debe ingresar un valor mayor a 0'
    },
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Debe ingresar un número'
    }
  }
};
