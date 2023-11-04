import React, { Dispatch, MutableRefObject, SetStateAction, createContext, useContext, useRef, useState } from 'react';
import { Pagination } from '../../../models/Generic';
import { usePagination } from '../../../components/searcher/usePagination';
import { errorSnackbar } from '../../../components/Snackbar/Snackbar';
import { useNavigate } from 'react-router-dom';
import { Report } from '../../../models/Report';
import { getReport } from '../../../services/reportService';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  reports?: Report[];
  setReports: Dispatch<SetStateAction<Report[] | undefined>>;
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
  queryParams: MutableRefObject<Record<string, string>>;
  showReport?: Report;
  setShowReport: Dispatch<SetStateAction<Report | undefined>>;
  getShowReport: (id: string) => Promise<void>;
};

const ReportContext = createContext<StoreProps | null>(null);

export const ReportsProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const INDEX_URL = `${process.env.REACT_APP_API_URL}/reports`;
  // Table Data
  const [reports, setReports] = useState<Report[]>();
  const [showReport, setShowReport] = useState<Report>();

  const queryParams = useRef<Record<string, string>>({
    category_eq: '',
    reportable_type_eq: '',
    status_eq: '0',
    created_at_gteq: '',
    created_at_lteq: ''
  });

  const { pagination, setPagination } = usePagination<Report>({
    url: INDEX_URL,
    requestCallback: (data) => indexRequestCallback(data),
    queryParams: queryParams.current,
    optionalParam: 'q[s]=created_at+desc'
  });

  const indexRequestCallback = (reports: Report[]) => {
    setReports(reports);
  };

  const getShowReport = async (id: string) => {
    try {
      const report = await getReport(id);

      setShowReport(report);
    } catch (error) {
      errorSnackbar('Error al obtener el reporte. Contacte a soporte.');
      navigate('/');
    }
  };

  const store: StoreProps = {
    reports,
    setReports,
    pagination,
    setPagination,
    queryParams,
    showReport,
    setShowReport,
    getShowReport
  };

  return <ReportContext.Provider value={store}>{children}</ReportContext.Provider>;
};

export const useReports = (): StoreProps => {
  return useContext(ReportContext) as StoreProps;
};
