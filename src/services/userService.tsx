import axios, { AxiosResponse } from 'axios';
import { User } from '../models/User';

const userUrl = `${process.env.REACT_APP_API_URL}/users`;

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
  const response = await axios.post<LoginResponse>(`${userUrl}/sign_in`, body);

  return response;
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
