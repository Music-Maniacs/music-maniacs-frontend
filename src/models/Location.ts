import { ModelValidations } from './Generic';

export interface Location {
  id: string;
  zip_code: string;
  street: string;
  department: string;
  locality: string;
  latitude: string;
  longitude: string;
  number: number;
  country: string;
  province: string;
}

export const locationValidations: Readonly<ModelValidations<Location>> = {
  latitude: {
    min: { value: -90, message: 'La latitud debe ser mayor a -90' },
    max: { value: 90, message: 'La latitud debe ser menor a 90' }
  },
  longitude: {
    min: { value: -180, message: 'La longitud debe ser mayor a -180' },
    max: { value: 180, message: 'La longitud debe ser menor a 180' }
  }
};
