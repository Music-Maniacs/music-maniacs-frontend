import axios from 'axios';
import { Genre } from '../models/Genre';

const genresUrl = `${process.env.REACT_APP_API_URL}/genres`;

export async function fetchGenresSelect(): Promise<Genre[]> {
  const response = await axios.get<Genre[]>(`${genresUrl}/genres_select`);

  return response.data;
}
