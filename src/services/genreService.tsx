import axios, { AxiosResponse } from 'axios';
import { Genre } from '../models/Genre';
import { PaginatedApiResponse } from '../models/Generic';


const genresUrl = `${process.env.REACT_APP_API_URL}/admin/genres`;

export async function createGenre(name: string): Promise<Genre> {
    const body = {
    genre: {
        name
      }
    };
    return (await axios.post(genresUrl, body)).data;
}

export async function deleteGenre(id: string): Promise<void> {
  return await axios.delete(`${genresUrl}/${id}`);
}

export async function updateGenre(id: string, name: string): Promise<Genre> {
  const body = {
  genre: {
      name
    }
  };
  return (await axios.put(`${genresUrl}/${id}`, body)).data;
}