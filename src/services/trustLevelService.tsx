import axios from 'axios';
import { TrustLevel } from '../models/TrustLevel';

const adminTrustLevelsUrl = `${process.env.REACT_APP_API_URL}/admin/trust_levels`;

export async function adminCreateTrustLevel(
  trustLevel: {
    name: string;
    order: number;
    days_visited: number;
    viewed_events: number;
    likes_received: number;
    likes_given: number;
    comments_count: number;
  },
  permission_ids: string[]
): Promise<TrustLevel> {
  const body = {
    trust_level: {
      ...trustLevel,
      permission_ids
    }
  };
  return (await axios.post(adminTrustLevelsUrl, body)).data;
}

export async function adminGetTrustLevel(id: string): Promise<TrustLevel> {
  return (await axios.get(`${adminTrustLevelsUrl}/${id}`)).data;
}

export async function adminDeleteTrustLevel(id: string): Promise<void> {
  return await axios.delete(`${adminTrustLevelsUrl}/${id}`);
}

export async function adminUpdateTrustLevel(
  id: string,
  trustLevel: {
    name: string;
    order: number;
    days_visited: number;
    viewed_events: number;
    likes_received: number;
    likes_given: number;
    comments_count: number;
  },
  permission_ids: string[]
): Promise<TrustLevel> {
  const body = {
    trust_level: {
      ...trustLevel,
      permission_ids
    }
  };
  return (await axios.put(`${adminTrustLevelsUrl}/${id}`, body)).data;
}
