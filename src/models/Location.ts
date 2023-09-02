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

export const locationValidations: Readonly<ModelValidations<Location>> = {};
