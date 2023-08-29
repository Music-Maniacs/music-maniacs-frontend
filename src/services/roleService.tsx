import axios from 'axios';
import { Permission, Role } from '../models/Role';

const adminRolesUrl = `${process.env.REACT_APP_API_URL}/admin/roles`;

export async function adminGetPermissions(): Promise<Permission[]> {
  return (await axios.get(`${adminRolesUrl}/permissions_select`)).data;
}

export async function adminCreateRole(name: string, permission_ids: string[]): Promise<Role> {
  const body = {
    role: {
      name,
      permission_ids
    }
  };
  return (await axios.post(adminRolesUrl, body)).data;
}

export async function adminGetRole(id: string): Promise<Role> {
  return (await axios.get(`${adminRolesUrl}/${id}`)).data;
}

export async function adminDeleteRole(id: string): Promise<void> {
  return await axios.delete(`${adminRolesUrl}/${id}`);
}

export async function adminUpdateRole(id: string, name: string, permission_ids: string[]): Promise<Role> {
  const body = {
    role: {
      name,
      permission_ids
    }
  };
  return (await axios.put(`${adminRolesUrl}/${id}`, body)).data;
}

export async function fetchRolesSelect(): Promise<Role[]> {
  const response = await axios.get<Role[]>(`${adminRolesUrl}/roles_select`);
  return response.data;
}
