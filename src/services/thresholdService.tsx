import axios from 'axios';
import { Threshold } from '../models/Threshold';

const URL = `${process.env.REACT_APP_API_URL}/admin/penalty_thresholds`;

export async function indexThreshold(): Promise<Array<Threshold>> {
  return (await axios.get(URL)).data.data;
}

export async function createThreshold(penalty_score: number, days_blocked: number): Promise<Threshold> {
  const body = {
    penalty_score,
    days_blocked
  };
  return (await axios.post(URL, body)).data;
}

export async function destroyThreshold(id: string): Promise<void> {
  return await axios.delete(`${URL}/${id}`);
}

export async function updateThreshold(id: string, penalty_score: number, days_blocked: number): Promise<Threshold> {
  const body = {
    penalty_score,
    days_blocked
  };
  return (await axios.put(`${URL}/${id}`, body)).data;
}
