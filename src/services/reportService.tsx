import axios from 'axios';
import { Report } from '../models/Report';

const reportsUrl = `${process.env.REACT_APP_API_URL}/reports`;

export async function getReport(id: string): Promise<Report> {
  return (await axios.get(`${reportsUrl}/${id}`)).data;
}
