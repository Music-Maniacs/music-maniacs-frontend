import { ModelValidations } from './Generic';

export interface Threshold {
  id?: string;
  penalty_score: number;
  days_blocked: number;
  created_at?: string,
  updated_at?: string,
  permanent_block?: boolean;
}

export const thresholdValidations: Readonly<ModelValidations<Threshold>> = {
  penalty_score: {
    required: {
      value: true,
      message: 'Debe ingresar la cantidad de penalizaciones'
    },
    validate: (value) => {
      return value > 0;
    }
  },
  days_blocked: {
    validate: (value) => {
      return value > 0;
    }
  }
};
