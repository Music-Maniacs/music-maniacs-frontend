import axios from 'axios';
import { User } from '../models/User';

const userUrl = '/user';

export async function login(username: string, password: string): Promise<User> {
  const response: User = (await axios.post(`${userUrl}/login`, { username, password })).data;

  return response;
}

// todo: agregar atributos
export async function register(username: string, password: string): Promise<User> {
  const response: User = (await axios.post(userUrl, { username, password })).data;

  return response;
}
