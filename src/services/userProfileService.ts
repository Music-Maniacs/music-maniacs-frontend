import axios from 'axios';
import { User } from '../models/User';

const profileUrl = `${process.env.REACT_APP_API_URL}/profile`;

export async function getUserProfile(id: string): Promise<User> {
  return (await axios.get(`${profileUrl}/${id}`)).data;
}

export async function updateProfile(
  full_name: string,
  username: string,
  email: string,
  biography: string,
  links_attributes: { id?: string; title: string; url: string; _destroy?: boolean }[],
  images_attributes: { id: string; _destroy: boolean },
  profile_image?: File,
  cover_image?: File
): Promise<User> {
  const body = {
    user: {
      full_name,
      username,
      email,
      biography,
      links_attributes,
      images_attributes //imagenes a borrar
    }
  };
  const formData = new FormData();

  formData.append('user', JSON.stringify(body));

  profile_image && formData.append('profile_image', profile_image);
  cover_image && formData.append('cover_image', cover_image);

  return (await axios.put(`${profileUrl}`, formData)).data;
}

export async function deleteUserProfile(): Promise<void> {
  return await axios.delete(`${profileUrl}`);
}

export async function changePasswordUserProfile(password: string, passwordConfirmation: string): Promise<void> {
  const body = {
    user: {
      password: password,
      password_confirmation: passwordConfirmation
    }
  };
  return await axios.put(`${profileUrl}/change_password`, body);
}
