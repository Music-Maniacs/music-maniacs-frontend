import React, { useEffect } from 'react';
import { errorSnackbar } from '../Snackbar/Snackbar';
import axios, { isAxiosError } from 'axios';
import { PaginatedApiResponse, Pagination, SelectCollection } from '../../models/Generic';
import { useNavigate } from 'react-router-dom';

type Props<T> = {
  url: string;
  requestCallback: (data: T[]) => void;
  optionalParam?: string;
  queryParams?: Record<string, string | SelectCollection>;
  perPage?: number;
  page?: number;
  isLoading?: boolean;
};

function buildParams(params: Record<string, string | SelectCollection>): string {
  return (
    Object.keys(params)
      // @ts-ignore
      .map((key) => `q[${key}]=${params[key].value || params[key]}`)
      .join('&')
  );
}

export const usePagination = <T>({
  url,
  requestCallback,
  queryParams,
  perPage = 10,
  page = 1,
  optionalParam,
  isLoading = true
}: Props<T>) => {
  const navigate = useNavigate();
  const [pagination, setPagination] = React.useState<Pagination>({
    page,
    perPage,
    total: 0,
    isLoading
  });

  useEffect(() => {
    pagination.isLoading && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.isLoading]);

  const fetchData = async () => {
    try {
      const response = await axios.get<PaginatedApiResponse<T>>(
        `${url}?page=${pagination.page}&per_page=${pagination.perPage}${
          queryParams ? `&${buildParams(queryParams)}` : ''
        }${optionalParam ? `&${optionalParam}` : ''}`
      );

      requestCallback(response.data.data);

      setPagination((prevState) => ({
        ...prevState,
        total: response.data.pagination.total,
        isLoading: false
      }));
    } catch (error) {
      if (isAxiosError(error) && (error?.response?.status === 403 || error?.response?.status === 401)) {
        errorSnackbar('No tiene permisos para realizar esta acción');

        return navigate('/');
      }

      errorSnackbar('Error al cargar los datos. Contacte a soporte.');
    }
  };

  return { pagination, setPagination };
};
