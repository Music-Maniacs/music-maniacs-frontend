import { ModelValidations } from './Generic';

export interface Location {
  id: string;
  zip_code: string;
  street: string;
  city: string;
  latitude: string;
  longitude: string;
  number: number;
  country: string;
  province: string;
}

export const locationValidations: Readonly<ModelValidations<Location>> = {
  latitude: {
    required: {
      value: true,
      message: 'Debe ingresar la latitud'
    },
    min: { value: -90, message: 'La latitud debe ser mayor a -90' },
    max: { value: 90, message: 'La latitud debe ser menor a 90' }
  },
  longitude: {
    required: {
      value: true,
      message: 'Debe ingresar la longitud'
    },
    min: { value: -180, message: 'La longitud debe ser mayor a -180' },
    max: { value: 180, message: 'La longitud debe ser menor a 180' }
  },
  number: {
    min: { value: 0.1, message: 'El número debe ser mayor a 0' }
  }
};
