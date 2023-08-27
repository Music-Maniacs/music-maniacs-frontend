import axios from 'axios';
import { Genre } from '../models/Genre';

const genresUrl = `${process.env.REACT_APP_API_URL}/genres`;
const genresAdminUrl = `${process.env.REACT_APP_API_URL}/admin/genres`;

export async function fetchGenresSelect(): Promise<Genre[]> {
  const response = await axios.get<Genre[]>(`${genresUrl}/genres_select`);

  return response.data;
}

export async function createGenre(name: string): Promise<Genre> {
  const body = {
    genre: {
      name
    }
  };
  return (await axios.post(genresAdminUrl, body)).data;
}

export async function deleteGenre(id: string): Promise<void> {
  return await axios.delete(`${genresAdminUrl}/${id}`);
}

export async function updateGenre(id: string, name: string): Promise<Genre> {
  const body = {
    genre: {
      name
    }
  };
  return (await axios.put(`${genresAdminUrl}/${id}`, body)).data;
}
