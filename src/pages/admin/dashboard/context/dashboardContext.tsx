import React, { MutableRefObject, createContext, useContext, useEffect, useRef, useState } from 'react';
import { DashboardGraphs, DashboardTables } from '../../../../models/Dashboard';
import { getDashboardGraphs, getDashboardTables } from '../../../../services/dashboardService';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { Policy } from '../../../../models/Policy';
import { checkPolicy } from '../../../../services/policyService';
import { isAxiosError } from 'axios';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  dashboardGraphs?: DashboardGraphs;
  dashboardTables?: DashboardTables;
  isGraphRequestLoading: boolean;
  isTableRequestLoading: boolean;
  queryParams: MutableRefObject<Record<string, string>>;
  lastSearchParams?: MutableRefObject<Record<string, string>>;
  fetchGraphs: () => Promise<void>;
  policies?: Policy;
};

const DashboardContext = createContext<StoreProps | null>(null);

export const DashboardProvider = ({ children }: Props) => {
  const [isGraphRequestLoading, setIsGraphRequestLoading] = useState<boolean>(true);
  const [dashboardGraphs, setDashboardGraphs] = useState<DashboardGraphs>();
  const [isTableRequestLoading, setIsTableRequestLoading] = useState<boolean>(true);
  const [dashboardTables, setDashboardTables] = useState<DashboardTables>();
  const [policies, setPolicies] = useState<Policy>();

  const startDateObj = new Date();
  startDateObj.setDate(startDateObj.getDate() - 30);

  const queryParams = useRef<Record<string, string>>({
    startDate: startDateObj.toISOString(),
    endDate: new Date().toISOString()
  });

  // Los uso para guardar los valores de la ultima busqueda. Asi muestro el periodo en el PDF.
  const lastSearchParams = useRef<Record<string, string>>({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    getPolicy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPolicy = async () => {
    try {
      const response = await checkPolicy('Admin::MetricsController');

      setPolicies(response);

      fetchTables();
      fetchGraphs();
    } catch (error) {
      errorSnackbar('Error al obtener los permisos. Contacte a soporte');
    }
  };

  const fetchGraphs = async () => {
    setIsGraphRequestLoading(true);
    try {
      const response = await getDashboardGraphs(queryParams.current.startDate, queryParams.current.endDate);
      const { startDate: lastStartDate, endDate: lastEndDate, data } = response;

      lastSearchParams.current = {
        endDate: queryParams.current.endDate ? lastEndDate : '',
        startDate: queryParams.current.startDate ? lastStartDate : ''
      };

      setDashboardGraphs(data);
    } catch (error) {
      setDashboardGraphs(undefined);

      if (isAxiosError(error) && error.response?.status === 403) {
        return errorSnackbar('No tienes permisos para consultar los gráficos');
      }

      errorSnackbar('Error al obtener las gráficas. Contacte a Soporte.');
    } finally {
      setIsGraphRequestLoading(false);
    }
  };

  const fetchTables = async () => {
    setIsTableRequestLoading(true);
    try {
      const response = await getDashboardTables();

      setDashboardTables(response);
    } catch (error) {
      setDashboardTables(undefined);

      if (isAxiosError(error) && error.response?.status === 403) {
        return errorSnackbar('No tienes permisos para consultar las tablas de métricas');
      }

      errorSnackbar('Error al obtener las tablas. Contacte a Soporte.');
    } finally {
      setIsTableRequestLoading(false);
    }
  };

  const store = {
    dashboardGraphs,
    dashboardTables,
    isGraphRequestLoading,
    isTableRequestLoading,
    queryParams,
    lastSearchParams,
    fetchGraphs,
    policies
  };

  return <DashboardContext.Provider value={store}>{children}</DashboardContext.Provider>;
};

export const useDashboard = (): StoreProps => {
  return useContext(DashboardContext) as StoreProps;
};
