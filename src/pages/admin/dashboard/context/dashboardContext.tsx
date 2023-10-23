import React, { MutableRefObject, createContext, useContext, useEffect, useRef, useState } from 'react';
import { DashboardGraphs, DashboardTables } from '../../../../models/Dashboard';
import { getDashboardGraphs, getDashboardTables } from '../../../../services/dashboardService';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';

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
};

const DashboardContext = createContext<StoreProps | null>(null);

export const DashboardProvider = ({ children }: Props) => {
  const [isGraphRequestLoading, setIsGraphRequestLoading] = useState<boolean>(true);
  const [dashboardGraphs, setDashboardGraphs] = useState<DashboardGraphs>();
  const [isTableRequestLoading, setIsTableRequestLoading] = useState<boolean>(true);
  const [dashboardTables, setDashboardTables] = useState<DashboardTables>();

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
    fetchGraphs();
    fetchTables();
  }, []);

  const fetchGraphs = async () => {
    setIsGraphRequestLoading(true);
    try {
      const response = await getDashboardGraphs(queryParams.current.startDate, queryParams.current.endDate);
      const { startDate: lastStartDate, endDate: lastEndDate, data } = response;

      lastSearchParams.current = {
        startDate: lastStartDate,
        endDate: lastEndDate
      };

      setDashboardGraphs(data);
    } catch (error) {
      errorSnackbar('Error al obtener las gráficas. Contacte a Soporte.');
      setDashboardGraphs(undefined);
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
      errorSnackbar('Error al obtener las tablas. Contacte a Soporte.');
      setDashboardTables(undefined);
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
    fetchGraphs
  };

  return <DashboardContext.Provider value={store}>{children}</DashboardContext.Provider>;
};

export const useDashboard = (): StoreProps => {
  return useContext(DashboardContext) as StoreProps;
};
