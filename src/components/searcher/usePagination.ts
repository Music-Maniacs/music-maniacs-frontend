import React, { useEffect } from 'react';
import { errorSnackbar } from '../Snackbar/Snackbar';
import axios from 'axios';
import { PaginatedApiResponse, Pagination } from '../../models/Generic';

type Props<T> = {
  url: string;
  requestCallback: (data: T[]) => void;
  queryParams?: Record<string, string>;
};

function buildParams(params: Record<string, string>): string {
  return Object.keys(params)
    .map((key) => `q[${key}]=${params[key]}`)
    .join('&');
}

export const usePagination = <T>({ url, requestCallback, queryParams, ...props }: Props<T>) => {
  const [pagination, setPagination] = React.useState<Pagination>({
    page: 1,
    perPage: 10,
    total: 0,
    isLoading: true
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
        }`
      );

      requestCallback(response.data.data);

      setPagination((prevState) => ({
        ...prevState,
        total: response.data.pagination.total,
        isLoading: false
      }));
    } catch (error) {
      errorSnackbar('Error al cargar los datos. Contacte a soporte.');
    }
  };

  return { pagination, setPagination };
};
