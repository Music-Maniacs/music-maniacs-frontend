import axios, { AxiosResponse } from 'axios';
import { User } from '../models/User';

const userUrl = `${process.env.REACT_APP_API_URL}/users`;

const adminUsersUrl = `${process.env.REACT_APP_API_URL}/admin/users`;

export type LoginResponse = {
  message: string;
  user: User;
};

export async function login(loginCredentials: string, password: string): Promise<AxiosResponse<LoginResponse>> {
  const body = {
    user: {
      login: loginCredentials,
      password
    }
  };
  const response = await axios.post(`${userUrl}/sign_in`, body);
  let user: User = response.data.user;
  if (response.data.user.profile_image_full_url)
    user.profile_image = { full_url: response.data.user.profile_image_full_url };
  response.data.user = user;
  const res: AxiosResponse<LoginResponse> = response;
  return res;
}

export async function register(
  full_name: string,
  username: string,
  email: string,
  password: string,
  password_confirmation: string
): Promise<void> {
  const body = {
    user: {
      full_name,
      username,
      password,
      email,
      password_confirmation
    }
  };

  return await axios.post(userUrl, body);
}

export async function recoverPasswordEmail(email: string): Promise<void> {
  const body = {
    user: {
      email
    }
  };

  return await axios.post(`${userUrl}/password`, body);
}

export async function recoverPassword(
  password: string,
  password_confirmation: string,
  reset_password_token: string
): Promise<void> {
  const body = {
    user: {
      password,
      password_confirmation,
      reset_password_token
    }
  };
  return await axios.patch(`${userUrl}/password`, body);
}

export async function adminCreateUser(
  full_name: string,
  username: string,
  email: string,
  role_id: string,
  password: string,
  password_confirmation: string,
  biography: string,
  links_attributes: {
    title: string;
    url: string;
  }[]
): Promise<User> {
  const body = {
    user: {
      full_name,
      username,
      password,
      email,
      role_id,
      password_confirmation,
      biography,
      links_attributes
    }
  };

  return (await axios.post(adminUsersUrl, body)).data;
}

export async function adminGetUser(id: string): Promise<User> {
  return (await axios.get(`${adminUsersUrl}/${id}`)).data;
}

export async function adminDeleteUser(id: string): Promise<void> {
  return await axios.delete(`${adminUsersUrl}/${id}`);
}

export async function adminUpdateUser(
  id: string,
  full_name: string,
  username: string,
  email: string,
  role_id: string,
  biography: string,
  links_attributes: { id?: string; title: string; url: string; _destroy?: boolean }[]
): Promise<User> {
  const body = {
    user: {
      full_name,
      username,
      email,
      role_id,
      biography,
      links_attributes
    }
  };

  return (await axios.put(`${adminUsersUrl}/${id}`, body)).data;
}

export async function adminRestoreUser(id: string): Promise<void> {
  return await axios.put(`${adminUsersUrl}/${id}/restore`);
}

export async function adminBlockUser(id: string, blockedUntil: Date): Promise<void> {
  const body = {
    blocked_until: blockedUntil.toString()
  };
  return await axios.put(`${adminUsersUrl}/${id}/block`, body);
}

export async function adminUnblockUser(id: string): Promise<void> {
  return await axios.put(`${adminUsersUrl}/${id}/unblock`);
}
