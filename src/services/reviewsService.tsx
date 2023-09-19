import axios from 'axios';
import { Review } from '../models/Review';

const eventsUrl = `${process.env.REACT_APP_API_URL}/events`;
const reviewsUrl = `${process.env.REACT_APP_API_URL}/reviews`;

export async function createReview(
  rating: number,
  description: string,
  eventId: string,
  reviewableKlass: 'artist' | 'venue' | 'producer'
): Promise<Review> {
  const body = {
    review: {
      rating,
      description
    }
  };

  return (await axios.post(`${eventsUrl}/${eventId}/add_review/${reviewableKlass}`, body)).data;
}

export async function updateReview(id: string, rating: number, description: string): Promise<Review> {
  const body = {
    review: {
      rating,
      description
    }
  };

  return (await axios.put(`${reviewsUrl}/${id}`, body)).data;
}
