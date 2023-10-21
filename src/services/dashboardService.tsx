import axios from 'axios';
import { DashboardGraphs, DashboardTables } from '../models/Dashboard';

const dashboardUrl = `${process.env.REACT_APP_API_URL}/metrics`;

export async function getDashboardGraphs(startDate?: string, endDate?: string): Promise<DashboardGraphs> {
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

  return (await axios.get(`${dashboardUrl}?startDate=${startDate}&endDate=${endDate}`)).data;
}

export async function getDashboardTables(): Promise<DashboardTables> {
  return (await axios.get(`${dashboardUrl}/metrics_and_user_type`)).data;
}
