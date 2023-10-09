import axios from 'axios';
import { Artist } from '../models/Artist';
import { Producer } from '../models/Producer';
import { Review } from '../models/Review';
import { User } from '../models/User';
import { Venue } from '../models/Venue';

const profileUrl = `${process.env.REACT_APP_API_URL}/profile`;

type ProfileRes = {
  user: User;
  reviews: Review[];
};
export async function getUserProfile(id: string): Promise<ProfileRes> {
  const res = (await axios.get(`${profileUrl}/${id}`)).data;
  const user: User = res;
  const reviews: Review[] = res.last_reviews;
  return { user, reviews };
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
    full_name,
    username,
    email,
    biography,
    links_attributes,
    images_attributes //imagenes a borrar
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

export type Follow = {
  id: string;
  name: string;
};
export async function getFollowedArtists(): Promise<Follow[]> {
  return await axios.get(`${profileUrl}/show_followed_artists`);
}
export async function getFollowedEvents(): Promise<Follow[]> {
  return await axios.get(`${profileUrl}/show_followed_events`);
}
export async function getFollowedProducers(): Promise<Follow[]> {
  return await axios.get(`${profileUrl}/show_followed_producers`);
}
export async function getFollowedVenues(): Promise<Follow[]> {
  return await axios.get(`${profileUrl}/show_followed_venues`);
}
