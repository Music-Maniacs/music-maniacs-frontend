import axios from 'axios';
import { Report } from '../models/Report';

const reportsUrl = `${process.env.REACT_APP_API_URL}/reports`;

export async function getReport(id: string): Promise<Report> {
  return (await axios.get(`${reportsUrl}/${id}`)).data;
}

export async function resolveReport(
  id: string,
  moderatorComment: string,
  penalizationScore: number,
  reportAction: 'accept' | 'reject'
): Promise<Report> {
  const body = {
    // report: {
    moderator_comment: moderatorComment,
    penalization_score: penalizationScore,
    report_action: reportAction
    // }
  };
  return (await axios.post(`${reportsUrl}/${id}/resolve`, body)).data;
}
