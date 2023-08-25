import { RegisterOptions } from 'react-hook-form';

export type Dictionary = {
  [key: string]: string;
};

export type PaginatedApiResponse<T> = {
  data: T[];
  pagination: {
    total: number;
  };
};

export type FormErrors<T> = {
  errors: {
    [K in keyof T]?: {
      error: string;
      value?: string;
      count?: number;
    }[];
  };
};

export type Pagination = {
  page: number;
  perPage: number;
  total: number;
  isLoading: boolean;
};

export type SelectCollection = {
  label: string;
  value: string;
};

export type MMColors = 'primary' | 'secondary' | 'tertiary' | 'success' | 'error' | 'info' | 'warning';

export type ModelValidations<T> = {
  readonly [Key in keyof T]?: RegisterOptions;
};
