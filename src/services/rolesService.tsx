import axios from 'axios';
import { Role } from '../models/Role';

const rolesUrl = `${process.env.REACT_APP_API_URL}/admin/roles`;

export async function fetchRolesSelect(): Promise<Role[]> {
  const response = await axios.get<Role[]>(`${rolesUrl}/roles_select`);

  return response.data;
}
