import axios from 'axios';
import { Artist } from '../models/Artist';
import { ReportCategory } from '../models/Report';

const artistsUrl = `${process.env.REACT_APP_API_URL}/artists`;
const adminArtistsUrl = `${process.env.REACT_APP_API_URL}/admin/artists`;

export async function createArtist(
  name: string,
  nationality: string,
  description: string,
  genre_ids: string[],
  links_attributes: {
    title: string;
    url: string;
  }[],
  image?: File
): Promise<Artist> {
  const formData = new FormData();

  const artistData = {
    name,
    nationality,
    description,
    genre_ids,
    links_attributes
  };

  formData.append('artist', JSON.stringify(artistData));
  image && formData.append('image', image);

  return (await axios.post(artistsUrl, formData)).data;
}

export async function updateArtist(
  id: string,
  name: string,
  nationality: string,
  description: string,
  genre_ids: string[],
  links_attributes: {
    title: string;
    url: string;
  }[],
  image?: File
): Promise<Artist> {
  const formData = new FormData();

  const artistData = {
    name,
    nationality,
    description,
    genre_ids,
    links_attributes
  };

  formData.append('artist', JSON.stringify(artistData));
  image && formData.append('image', image);

  return (await axios.put(`${artistsUrl}/${id}`, formData)).data;
}

export async function getArtist(id: string): Promise<Artist> {
  return (await axios.get(`${artistsUrl}/${id}`)).data;
}

export async function reportArtist(
  id: string,
  userComment: string,
  category: ReportCategory,
  originalReportableId?: string
): Promise<void> {
  const requestBody = {
    report: {
      user_comment: userComment,
      category,
      original_reportable_id: originalReportableId
    }
  };

  return (await axios.post(`${artistsUrl}/${id}/report`, requestBody)).data;
}

export async function followArtist(id: string) {
  return (await axios.post(`${artistsUrl}/${id}/follow`)).data;
}

export async function unfollowArtist(id: string) {
  return (await axios.post(`${artistsUrl}/${id}/unfollow`)).data;
}

export async function adminCreateArtist(
  name: string,
  nationality: string,
  description: string,
  genre_ids: string[],
  links_attributes: {
    title: string;
    url: string;
  }[],
  image?: File
): Promise<Artist> {
  const formData = new FormData();

  const artistData = {
    name,
    nationality,
    description,
    genre_ids,
    links_attributes
  };

  formData.append('artist', JSON.stringify(artistData));
  image && formData.append('image', image);

  return (await axios.post(adminArtistsUrl, formData)).data;
}

export async function adminGetArtist(id: string): Promise<Artist> {
  return (await axios.get(`${adminArtistsUrl}/${id}`)).data;
}

export async function adminDeleteArtist(id: string): Promise<void> {
  return await axios.delete(`${adminArtistsUrl}/${id}`);
}

export async function adminUpdateArtist(
  id: string,
  name: string,
  nationality: string,
  description: string,
  genre_ids: string[],
  links_attributes: {
    title: string;
    url: string;
  }[],
  image?: File
): Promise<Artist> {
  const formData = new FormData();

  const artistData = {
    name,
    nationality,
    description,
    genre_ids,
    links_attributes
  };

  formData.append('artist', JSON.stringify(artistData));
  image && formData.append('image', image);

  return (await axios.put(`${adminArtistsUrl}/${id}`, formData)).data;
}
