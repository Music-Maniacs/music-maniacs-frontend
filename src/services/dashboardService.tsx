import axios from 'axios';
import { DashboardGraphs, DashboardTables } from '../models/Dashboard';

const dashboardUrl = `${process.env.REACT_APP_API_URL}/metrics`;

type DashboardGraphsResponse = {
  data: DashboardGraphs;
  startDate: string;
  endDate: string;
};

export async function getDashboardGraphs(startDate?: string, endDate?: string): Promise<DashboardGraphsResponse> {
  const today = new Date();

  // Default startDate is 6 months before today
  if (!startDate) {
    const startDateObj = new Date(today);
    startDateObj.setDate(startDateObj.getDate() - 30 * 6);
    startDate = startDateObj.toISOString();
  }

  // Default endDate is today
  if (!endDate) {
    endDate = today.toISOString();
  }

  const data = (await axios.get<DashboardGraphs>(`${dashboardUrl}?startDate=${startDate}&endDate=${endDate}`)).data;

  return { data, startDate, endDate };
}

export async function getDashboardTables(): Promise<DashboardTables> {
  return (await axios.get(`${dashboardUrl}/metrics_and_user_type`)).data;
}
