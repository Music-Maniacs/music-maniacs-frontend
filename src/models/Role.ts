import { ModelValidations } from './Generic';

export interface Role {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  permission_ids: string[];
}

export interface Permission {
  id: string;
  name: string;
  action: string;
  subject_class: string;
}

export const roleValidation: Readonly<ModelValidations<Role>> = {
  name: {
    required: { value: true, message: 'Debe ingresar el nombre de Rol' },
    maxLength: { value: 20, message: 'El nombre debe ser menor a 20 caracteres' }
  }
};
